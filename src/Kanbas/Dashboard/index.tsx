import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Dashboard(

  { courses, course, enrollments, enrolling, setCourse, addNewCourse,
    deleteCourse, updateCourse, updateEnrollment, setEnrolling }: {
      courses: any[]; course: any; enrollments: any[]; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
      updateEnrollment: (courseId: string, enrolled: boolean) => void;
      enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
    }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);


  // const [everyCourseOffered, setEveryCourseOffered] = useState(allCourses)

  const [courseFilter, setCourseFilter] = useState(false);

  // Conditionally filter the courses based on the enrollment state
  const displayedCourses = courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "STUDENT" ?
        <>
          <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
          <br />
          <br />
        </>
        :
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                addNewCourse();
                // setCourses((prevCourses) => [...prevCourses, course]); // Call the second function
              }}
            >
              Add
            </button>

            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />

          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      }
      <hr />

      <h2 id="wd-dashboard-published">
        {courseFilter ?
          `Enrolled Courses (${displayedCourses?.length})` :
          `Published Courses (${displayedCourses?.length})`
        }
      </h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
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
                      enrolling && (
                        <button
                          className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                        >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )

                    ) : (
                      // For non-students (admin or instructor actions)
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                            // setEveryCourseOffered(everyCourseOffered.filter(c => c._id !== course._id));
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
                            console.log("Edit button clicked!", course); // Add this line
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
