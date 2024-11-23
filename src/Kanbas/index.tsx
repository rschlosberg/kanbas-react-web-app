import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrolledCourseRoute from "./Dashboard/CourseEnrolledRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";


export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    let courses = [];
    try {
      courses = await userClient.findMyCourses();
    } catch (error) {
      console.error(error);
    }
    setCourses(courses);
  };

  const fetchAllCourses = async () => {
    let allCourses = [];
    try {
      allCourses = await courseClient.fetchAllCourses();
    } catch (error) {
      console.error(error);
    }
    setAllCourses(allCourses)
  }

  useEffect(() => {
    fetchAllCourses();
    fetchCourses();
  }, [currentUser]);


  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const [enrollments, setEnrollments] = useState<any[]>([]);

  const addEnrollment = (userId: string, courseId: string) => {
    const newEnrollment = {
      _id: new Date().getTime().toString(), // unique ID
      user: userId,
      course: courseId,
    };

    setEnrollments([...enrollments, newEnrollment]);
  };

  const deleteEnrollment = (courseId: string) => {
    setEnrollments((prevEnrollments) => {
      const updatedEnrollments = prevEnrollments.filter((enrollment) => enrollment.course !== courseId);
      return updatedEnrollments;
    });
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };


  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  const updateCourse = async () => {
    await courseClient.updateCourse(course);

    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    }));
  };


  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                  addEnrollment={addEnrollment}
                  deleteEnrollment={deleteEnrollment}
                  enrollments={enrollments}
                  allCourses={allCourses}
                />
              </ProtectedRoute>
            }
            />

            <Route path="/Courses/:cid/*" element={
              <EnrolledCourseRoute enrolledCourses={enrollments}>
                <Courses courses={courses} />
              </EnrolledCourseRoute>}
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
