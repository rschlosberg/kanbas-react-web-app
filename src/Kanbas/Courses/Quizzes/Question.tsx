import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import FillBlank from "./FillBlank";
import { FaTrash } from "react-icons/fa";

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
            <div className="mb-row mb-3 align-items-center">
                <label htmlFor="wd-title" className="col-sm-3 col-form-label">Question Text:</label>
                <textarea
                    id="wd-title"
                    rows={2}
                    value={question.questionText}
                    onChange={(e) => updateQuestion({ ...question, questionText: e.target.value })}
                    className="form-control"
                />
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