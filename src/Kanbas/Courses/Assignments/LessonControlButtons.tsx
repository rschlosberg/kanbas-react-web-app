import React, { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function LessonControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteAssignment(assignmentId);
    setShowModal(false);
  };

  return (
    <div className="float-end">

      <button
        className="btn me-1 float-end"
        onClick={() => setShowModal(true)}
      >
        <FaTrash className="text-danger me-2 mb-1" />
      </button>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />

      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          aria-labelledby="confirmDeleteLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmDeleteLabel">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this assignment?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}