import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaSearch } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router";

import * as db from "../../Database";


export default function Assignments() {
  const assignments = db.assignments
  const { cid } = useParams();


  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="input-group" style={{ maxWidth: "300px" }}>
        <span className="input-group-text bg-white border-end-0">
          
         <FaSearch className="text-muted" />
        </span>
        <input
          id="wd-search-assignment"
          type="text"
          className="form-control border-start-0"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>

      <div className="d-flex">
        <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
          + Group
        </button>
        <button id="wd-add-assignment" className="btn btn-danger">
          + Assignment
        </button>
      </div>
    </div>
 
        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-assignment-list-item list-group-item p-3 bg-secondary">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-3" />
                  <h3 className="wd-title p-3">
                      ASSIGNMENTS
                  </h3>
              </div>
              <div className="float-end">
                <span className="border border-dark rounded-pill px-4 py-2">
                  40% of Total
                </span>
                <FaPlus className="ms-3 me-2 position-relative" style={{ bottom: "1px" }} />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </li>
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li className="wd-assignment-list-item list-group-item p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-3" />
                    <div>
                      <a
                        className="wd-assignment-link text-decoration-none text-dark fs-5"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      >
                        {assignment._id}
                      </a>
                      <div className="text-muted mt-1">
                        <span className="text-danger">{assignment.title}</span> | <b>Not available until </b>{(new Date(assignment.available)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} |
                      </div>
                      <div>
                        <b>Due </b>{(new Date(assignment.due)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} | 100 pts
                      </div>
                    </div>
                </div>
                <LessonControlButtons />
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
}
