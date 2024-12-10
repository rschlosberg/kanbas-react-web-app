import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import FillBlank from "./FillBlank";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";

export default function Question({
    index,
    question,
    updateQuestion,
}: {
    index: number,
    question: any;
    updateQuestion: (question: any) => void;
}) {

    return (
        <>
            <div className="row mb-3 align-items-center">
                <label htmlFor="wd-quizQuestion" className="col-form-label col-auto">
                    Question Type:
                </label>
                <div className="col">
                    <select
                        id="wd-quizQuestion"
                        value={question.type}
                        onChange={(e) => updateQuestion({ ...question, type: e.target.value })}
                        className="form-select"
                    >
                        <option value="MULTIPLE CHOICE">Multiple Choice</option>
                        <option value="TRUE/FALSE">True/False</option>
                        <option value="FILL IN THE BLANK">Fill in the blank</option>
                    </select>
                </div>
            </div>


            <div className="mb-row mb-3 align-items-center" style={{ paddingBottom: "80px" }}>
                <label htmlFor="wd-question-text" className="col-sm-3 col-form-label">Question Text:</label>
                <div className="col-sm-9">
                    <ReactQuill
                        id="wd-question-text"
                        value={question.questionText} // Bind to the question text value
                        onChange={(content) => updateQuestion({ ...question, questionText: content })} // Update state on change
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }], // Header levels
                                ["bold", "italic", "underline", "strike"], // Text formatting
                                [{ list: "ordered" }, { list: "bullet" }], // Lists
                                ["link", "image"], // Media
                            ],
                        }} // Customize the toolbar
                        theme="snow" // Default theme
                        style={{ height: "100px" }} // Optional: Adjust height
                    />
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <label htmlFor="wd-title" className="col-auto col-form-label me-2">
                    Points:
                </label>
                <div className="col-auto">
                    <input
                        id="wd-title"
                        type="number"
                        value={question.pointsWorth}
                        onChange={(e) =>
                            updateQuestion({ ...question, pointsWorth: e.target.value })
                        }
                        className="form-control"
                        style={{ maxWidth: 100 }} // Ensures the field only accommodates up to 3 characters
                    />
                </div>
            </div>
            <br />

            {question.type === "MULTIPLE CHOICE" && (
                <MultipleChoice updateQuestion={updateQuestion} question={question} index={index} />
            )}

            {question.type === "TRUE/FALSE" && (
                <TrueFalse updateQuestion={updateQuestion} question={question} index={index} />
            )}

            {question.type === "FILL IN THE BLANK" && (
                <FillBlank updateQuestion={updateQuestion} question={question} index={index} />
            )}

        </>
    )
}