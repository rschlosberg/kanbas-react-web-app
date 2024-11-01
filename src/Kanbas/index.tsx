import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import * as db from "./Database";
import { useState } from "react";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrolledCourseRoute from "./Dashboard/CourseEnrolledRoute";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const [enrollments, setEnrollments] = useState<any[]>(db.enrollments);

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

  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
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
);}
