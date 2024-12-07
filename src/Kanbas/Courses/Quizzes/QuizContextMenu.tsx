import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash, FaBan } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";
import GreenCheckmark from "../Modules/GreenCheckmark";

const QuizContextMenu = ({
    quiz,
    cid,
    setQuizzes,
    handlePublishToggle,
}: {
    quiz: any;
    cid: any;
    setQuizzes: (quizzes: any) => void;
    handlePublishToggle: (
        quiz: any,
        setQuizzes: React.Dispatch<React.SetStateAction<any[]>>,
        quizzesClient: any
    ) => Promise<void>;
}) => {
    const navigate = useNavigate();


    return (
        <div className="dropdown">
            <IoEllipsisVertical
                className="fs-4 dropdown-toggle"
                id={`dropdownMenuButton-${quiz._id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            />
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton-${quiz._id}`}>
                {/* <li>
                    <button
                        className="dropdown-item"
                        onClick={() =>
                            navigate(`/Kanbas/Courses/${cid}/Quizzes/StudentQuizPage/${quiz._id}`)
                        }
                    >
                        Preview Quiz
                    </button>
                </li> */}
                <li>

                    <button
                        className="dropdown-item"
                        onClick={() => handlePublishToggle(quiz, setQuizzes, quizzesClient)}
                    >
                        {quiz.published ? (
                            <>
                                <FaBan className="text-danger" /> Unpublish Quiz
                            </>
                        ) : (
                            <>
                                <GreenCheckmark /> Publish Quiz
                            </>
                        )}
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() =>
                            navigate(`/Kanbas/Courses/${cid}/Quizzes/StudentQuizPage/${quiz._id}`)
                        }
                    // onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}
                    >
                        <FaPencil className="text-primary me-2" /> Edit Quiz
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={async () => {
                        await quizzesClient.deleteQuiz(quiz._id);
                        setQuizzes((prevQuizzes: any) => prevQuizzes.filter((q: { _id: any; }) => q._id !== quiz._id));
                    }}>
                        <FaTrash className="text-danger me-2" /> Delete Quiz
                    </button>
                </li>
            </ul>
        </div >
    );
};

export default QuizContextMenu;