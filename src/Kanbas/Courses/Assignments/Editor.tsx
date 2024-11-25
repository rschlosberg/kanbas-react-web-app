import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { addAssignment, updateAssignment } from "./reducer";
import { setAssignments, deleteAssignment } from "./reducer";



export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const assignment = assignments.find((assignment: any) => assignment._id === aid);

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { course: cid };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleInputChange = (field: string, value: any) => {
    dispatch(updateAssignment({ ...assignment, [field]: value }));
  };

  const handleSave = async () => {
    if (aid === "Editor") {
      await createAssignmentForCourse();
    }
    else {
      await saveAssignment({ ...assignment });
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          value={assignment?.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Assignment Description</label>
        <div id="wd-description" className="form-control">
          <p>
            The assignment is <span className="text-danger">available online.</span>
          </p>

          <textarea
            className="form-control mb-3"
            value={assignment?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={5}
          />
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source repositories</li>
          </ul>
          <p>The Kanbas application should include a link to navigate back to the landing page.</p>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label text-end">Points</label>
        <div className="col-sm-10">
          <input
            id="wd-points"
            value={assignment?.points}
            className="form-control"
            onChange={(e) => handleInputChange("points", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-group" className="col-sm-2 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-10">
          <select id="wd-group" className="form-select">
            <option selected value="Publish All">Publish All</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label text-end">Display Grade As</label>
        <div className="col-sm-10">
          <select id="wd-display-grade-as" className="form-select">
            <option selected value="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label text-end">Submission Type</label>
        <div className="col-sm-10">
          <select id="wd-submission-type" className="form-select">
            <option selected>Online</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label text-end">Online Entry Options</label>
        <div className="col-sm-10">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="wd-text-entry" />
            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="wd-website-url" />
            <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="wd-file-upload" />
            <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
          </div>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label text-end">Assign To</label>
        <div className="col-sm-10">
          <input id="wd-assign-to" value="Everyone" className="form-control" />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-due-date" className="col-sm-2 col-form-label text-end">Due</label>
        <div className="col-sm-10">
          <input
            type="date"
            id="wd-due-date"
            value={assignment?.due}
            onChange={(e) => handleInputChange("due", e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-available-from" className="col-sm-2 col-form-label text-end">Available from</label>
        <div className="col-sm-4">
          <input
            type="date"
            id="wd-available-from"
            value={assignment?.available}
            onChange={(e) => handleInputChange("available", e.target.value)}
            className="form-control"
          />
        </div>

        <label htmlFor="wd-available-until" className="col-sm-2 col-form-label text-end">Until</label>
        <div className="col-sm-4">
          <input
            type="date"
            id="wd-available-until"
            value={assignment?.until}
            onChange={(e) => handleInputChange("until", e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>


  );
}