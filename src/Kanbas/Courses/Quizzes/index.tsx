import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function Quizzes({ quizzes, setQuizzes }: { quizzes: any, setQuizzes: (quiz: any) => void }) {
    const { cid } = useParams();
    const navigate = useNavigate();


    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    };
    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    // const removeAssignment = async (assignmentId: string) => {
    //     await assignmentsClient.deleteAssignment(assignmentId);
    //     // dispatch(deleteAssignment(assignmentId));
    // };



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
                    <a
                        id="wd-add-assignment"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/Editor`}
                        className="btn btn-danger"
                    >
                        + Quiz
                    </a>
                </div>
            </div>

            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-assignment-list-item list-group-item p-3 bg-secondary">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-3 fs-3" />
                            <h3 className="wd-title p-3">
                                Assignment Quizzes
                            </h3>
                        </div>
                        <div className="float-end">

                            <FaPlus className="ms-3 me-2 position-relative" style={{ bottom: "1px" }} />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                </li>
                {quizzes
                    .map((quiz: any) => (
                        <li className="wd-assignment-list-item list-group-item p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-3 fs-3" />
                                    <div>
                                        <a
                                            className="wd-assignment-link text-decoration-none text-dark fs-5"
                                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                                        >
                                            {quiz.title}
                                        </a>
                                        <div className="text-muted mt-1">
                                            <span className="text-danger">{quiz.published}</span> | <b>Not available until </b>{(new Date(quiz.availableStartDate)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} |
                                        </div>
                                        <div>
                                            <b>Due </b>{(new Date(quiz.dueDate)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} | {quiz.points || "Points not yet assigned"}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn"
                                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}
                                    >
                                        <FaPencil className="text-success me-2 mb-1" />
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={async () => {
                                            await quizzesClient.deleteQuiz(quiz._id);
                                            setQuizzes((prevQuizzes: any) => prevQuizzes.filter((q: { _id: any; }) => q._id !== quiz._id));
                                        }}
                                    >
                                        <FaTrash className="text-danger me-2 mb-1" />
                                    </button>
                                </div>


                                {/* <LessonControlButtons assignmentId={assignment._id} deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}/> */}

                            </div>
                        </li>
                    ))}
            </ul>
        </div >
    );
}
