import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Question from "./Question";
import { FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import QuizTakerQuestion from "./QuizTakerQuestion";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";


export default function QuizTaker({
    quiz,
    submitQuizAttempt
}: {
    quiz: any;
    submitQuizAttempt: ((quiz: any) => void);
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid, qid } = useParams();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizAttempt, setCurrentQuizAttempt] = useState(
        {
            quiz: quiz._id,
            user: currentUser._id,
            answers: [
                ...quiz.questions.map((question: any) => { return { questionId: question._id } }),
            ]

        }
    )

    const setAnswer = (questionId: any, answerAttempt: any) => {
        const answerIndex = currentQuizAttempt.answers.findIndex((answer) => answer.questionId == questionId);
        currentQuizAttempt.answers[answerIndex].answer = answerAttempt;
        setCurrentQuizAttempt({ ...currentQuizAttempt })
    }

    const handleSubmit = () => {
        submitQuizAttempt(currentQuizAttempt); // Submit the quiz attempt

        navigate(`/Kanbas/Courses/${cid}/quizzes`);

    };


    return (
        <div>
            <QuizTakerQuestion question={quiz?.questions[currentQuestionIndex]} setAnswer={setAnswer} answer={currentQuizAttempt.answers[currentQuestionIndex]?.answer} />
            <hr />
            <div>Question {currentQuestionIndex + 1} out of {quiz?.questions?.length}</div>
            <hr />

            <div className="d-flex justify-content-between align-items-center my-3">
                {/* Previous Button */}
                {currentQuestionIndex !== 0 && (
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    >
                        Previous Question
                    </button>
                )}

                {/* Next Button */}
                {(currentQuestionIndex < quiz?.questions?.length - 1) && (
                    <button
                        className="btn btn-outline-primary ms-auto"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    >
                        Next Question
                    </button>
                )}
            </div>

            <div className="text-center mt-4">
                {/* Submit Button */}
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => handleSubmit()}

                >
                    SUBMIT QUIZ
                </button>
            </div>

        </div >
    );

}