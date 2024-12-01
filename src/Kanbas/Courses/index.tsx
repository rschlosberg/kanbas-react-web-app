import CoursesNavigation from "./Navigation";
import { useState, useEffect } from "react";

import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as client from "./client";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import StudentQuizPage from "./Quizzes/StudentQuizPage";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);
  const [peopleInClass, setPeopleInClass] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);


  const fetchPeopleInClass = async (cid: string) => {
    const people = await client.findUsersForCourse(cid);
    setPeopleInClass(people);
  };

  useEffect(() => {
    if (cid) {
      fetchPeopleInClass(cid);
    }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block" style={{ width: "200px" }}>
          <CoursesNavigation />
        </div>

        <div className="flex-grow-1 ms-3">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes quizzes={quizzes} setQuizzes={setQuizzes} />} />
            <Route path="Quizzes/:qid" element={<QuizEditor quizzes={quizzes} setQuizzes={setQuizzes} />} />
            <Route path="Quizzes/StudentQuizPage/:qid" element={<StudentQuizPage quizzes={quizzes} />} />
            <Route path="People" element={<PeopleTable users={peopleInClass} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}