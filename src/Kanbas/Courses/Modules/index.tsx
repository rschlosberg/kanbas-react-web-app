import React, { useState } from "react";
import ModulesControls from "./ModuleControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();


  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /><br /><br /><br />
      {modules
        .filter((module: any) => module.course === cid)
        .map((module: any) => (
          <ul id="wd-modules" className="list-group rounded-0" key={module._id}>
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                 {!module.editing && module.name}
                  { module.editing && (
                    <input className="form-control w-50 d-inline-block"
                          onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(updateModule({ ...module, editing: false }));
                            }
                          }}
                          defaultValue={module.name}/>
                  )}
                <ModuleControlButtons 
                  moduleId={module._id}
                  deleteModule={deleteModule}
                  editModule={editModule}
                />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1" key={lesson._id}>
                      <span className="wd-title">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        <ModuleControlButtons moduleId={module._id}
                          deleteModule={(moduleId) => {
                            dispatch(deleteModule(moduleId));
                          }}
                          editModule={(moduleId) => dispatch(editModule(moduleId))}
                        />
                      </span>
                      <ul className="wd-content p-3">
                        <li className="wd-content-item list-group-item p-3 ps-1">{lesson.description}</li>
                      </ul>
                      
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        ))}
    </div>
  );
}
