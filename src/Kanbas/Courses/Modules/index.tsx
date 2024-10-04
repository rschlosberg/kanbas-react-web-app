import ModulesControls from "./ModuleControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs';
 
export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />

      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
              Week 1
            <LessonControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  LEARNING OBJECTIVES
                <LessonControlButtons />
              </span>
              <ul className="wd-content p-3">
                <li className="wd-content-item list-group-item p-3 ps-1">Introduction to the course</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Learn what is Web Development</li>
              </ul>
              <span className="wd-title ">
                <BsGripVertical className="me-2 fs-3" />
                  READING
                <LessonControlButtons />
                </span>
              <ul className="wd-content p-3">
                <li className="wd-content-item list-group-item p-3 ps-1">Full Stack Developer - Chapter 1</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Full Stack Developer - Chapter 2</li>
              </ul>

              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  SLIDES
                <LessonControlButtons />
              </span>
              <ul className="wd-content p-3">
                <li className="wd-content-item list-group-item p-3 ps-1">Introduction to Web Development</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Creating a React Application</li>
              </ul>
              
            </li>
            
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2
            <LessonControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </span>
              <ul className="wd-content p-3">
                <li className="wd-content-item list-group-item p-3 ps-1">Introduction to HTML and the DOM</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Formatting Web content with Headings</li>
              </ul>

              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  SLIDES
                <LessonControlButtons />
              </span>
              <ul className="wd-content p-3">
                <li className="wd-content-item list-group-item p-3 ps-1">Introduction to HTML and the DOM</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Formatting Web content with Headings</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
