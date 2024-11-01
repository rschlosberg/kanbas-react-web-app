import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as db from "../Database"
export default function Dashboard(
  
{ courses, course, enrollments, setCourse, addNewCourse,
  deleteCourse, updateCourse, addEnrollment, deleteEnrollment}: {
  courses: any[]; course: any; enrollments: any[]; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; addEnrollment: (course: any, user: any) => void;
  deleteEnrollment: (course: any) => void;
})
 {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const initialEnrolledCourses = 
    courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === currentUser?._id && enrollment.course === course._id
      )
    );

  const [ enrolledCourses, setEnrolledCourses ] = useState(initialEnrolledCourses)

  const [courseFilter, setCourseFilter] = useState(false);

  // Conditionally filter the courses based on the enrollment state
  const displayedCourses = courseFilter ? enrolledCourses : courses;


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "STUDENT" ? 
      <>
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={()=> setCourseFilter(!courseFilter)} > Enrollments
        </button>
      <br />
      <br />
      </>
      :
      <>
      <h5>New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse} > Add
        </button>
        <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5>
      <br />
   
      
      <input defaultValue={course.name} className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value }) } 
      />
      <textarea defaultValue={course.description} className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value }) }
      />
         </>
      }
      <hr />

      <h2 id="wd-dashboard-published">
        { courseFilter ? 
          `Enrolled Courses (${displayedCourses.length})` :
          `Published Courses (${displayedCourses.length})`
        }
     </h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }} >
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course._id}/Home`}>
                  <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                  <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                  </h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                  </p>
                  <button className="btn btn-primary">Go</button>
                  {currentUser.role === "STUDENT" ? (
                    enrolledCourses.some(c => c._id === course._id) ? (
                      // If student is enrolled
                      <button 
                        onClick={(event) => {
                          event.preventDefault();
                          deleteEnrollment(course._id);
                          setEnrolledCourses(enrolledCourses.filter(c => c._id !== course._id));
                        }} 
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Un-Enroll
                      </button>
                    ) : (
                      // If student is not enrolled
                      <button 
                        onClick={(event) => {
                          event.preventDefault();
                          addEnrollment(currentUser._id, course._id);
                          setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
                        }} 
                        className="btn btn-success float-end"
                        id="wd-enroll-course-click"
                      >
                        Enroll
                      </button>
                    )
                  ) : (
                    // For non-students (admin or instructor actions)
                    <>
                      <button 
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} 
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button 
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </>
                  )}
                  

                  </div>
                    </Link>
                    </div>
                </div>
            ))}
            
        </div>
      </div>
    </div>
  );
}
