import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BsGripVertical } from "react-icons/bs";
import { FaBan, FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";



import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import StudentQuizPage from "./StudentQuizPage";
import QuizContextMenu from "./QuizContextMenu";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Quizzes({ quizzes, setQuizzes }: { quizzes: any, setQuizzes: (quiz: any) => void }) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);


    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    };
    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    const handlePublishToggle = async (
        quiz: any,
        setQuizzes: React.Dispatch<React.SetStateAction<any[]>>,
        quizzesClient: any
    ) => {
        try {
            // Toggle the published state of the quiz
            const updatedQuiz = await quizzesClient.updateQuiz({
                ...quiz,
                published: !quiz.published,
            });

            // Update the quizzes state with the updated quiz
            setQuizzes((prevQuizzes: any[]) =>
                prevQuizzes.map((q) => (q._id === updatedQuiz._id ? updatedQuiz : q))
            );
        } catch (error) {
            console.error("Failed to update quiz:", error);
        }
    };


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

                {currentUser.role === "FACULTY" &&
                    <div className="d-flex">
                        <a
                            id="wd-add-assignment"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/Editor`}
                            className="btn btn-danger"
                        >
                            + Quiz
                        </a>
                    </div>
                }
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

                            {/* <FaPlus className="ms-3 me-2 position-relative" style={{ bottom: "1px" }} /> */}
                            {/* <IoEllipsisVertical className="fs-4" /> */}
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
                                        <Link to={`/Kanbas/Courses/${cid}/Quizzes/StudentQuizPage/${quiz._id}`} className="text-decoration-none">
                                            {quiz.title}
                                        </Link>
                                        <div>
                                            <span className="me-1">
                                                {new Date(quiz.availableUntilDate) < new Date() ? (
                                                    "Closed"
                                                ) : new Date(quiz.availableStartDate) < new Date() ? (
                                                    "Available"
                                                ) : (
                                                    `Not available until ${new Date(quiz.availableStartDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}`
                                                )}
                                            </span>|
                                            <span className="me-1"><b> Due </b>{(new Date(quiz.dueDate)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                            | {quiz.points ? `${quiz.points} pts` : "Points not yet assigned"} | {quiz.questions ? `${quiz.questions.length} Questions` : "0 Questions"}
                                        </div>
                                    </div>
                                </div>
                                {currentUser.role === "FACULTY" ? (
                                    <div className="d-flex justify-content-end gap-2">
                                        <span></span>
                                        <button
                                            className="dropdown-item"
                                            onClick={async () => {
                                                try {
                                                    // Toggle the published state of the quiz
                                                    const updatedQuiz = await quizzesClient.updateQuiz({
                                                        ...quiz,
                                                        published: !quiz.published,
                                                    });

                                                    // Update the quizzes state with the updated quiz
                                                    setQuizzes((prevQuizzes: any) =>
                                                        prevQuizzes.map((q: any) => (q._id === updatedQuiz._id ? updatedQuiz : q))
                                                    );
                                                } catch (error) {
                                                    console.error("Failed to update quiz:", error);
                                                }
                                            }}

                                        >
                                            {quiz.published ? (
                                                <>
                                                    <span > <GreenCheckmark /> </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span><FaBan className="text-danger" style={{ fontSize: "1.25rem" }} /></span>
                                                </>
                                            )}
                                        </button>
                                        <QuizContextMenu
                                            quiz={quiz}
                                            cid={cid}
                                            setQuizzes={setQuizzes}
                                            handlePublishToggle={handlePublishToggle}
                                        />
                                    </div>
                                ) : (
                                    <button
                                        className="btn"
                                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/StudentQuizPage/${quiz._id}`)}
                                    >
                                        <FaPencil className="text-success me-2 mb-1" />
                                    </button>
                                )}

                            </div>
                        </li>
                    ))}
            </ul>
        </div >
    );
}
