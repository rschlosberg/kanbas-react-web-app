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

    // const quizAttemptSchema = new mongoose.Schema(
    //     {
    //         quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    //         user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    //         answers: [
    //             {
    //                 questionId: {
    //                     type: mongoose.Schema.Types.ObjectId,
    //                     ref: "Quiz.questions",
    //                 },
    //                 answer: String,
    //             }
    //         ],
    //         pointsEarned: Number,
    //         attempt: {
    //             type: Date,
    //             default: Date.now,
    //         }
    //     },
    //     { collection: "quizAttempts" }
    // );



    return (
        <div>
            <QuizTakerQuestion question={quiz?.questions[currentQuestionIndex]} setAnswer={setAnswer} answer={currentQuizAttempt.answers[currentQuestionIndex].answer} />
            <hr />
            <div>Question {currentQuestionIndex + 1} out of {quiz?.questions?.length}</div>
            <hr />

            {currentQuestionIndex !== 0 &&
                <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                    Previous Question
                </button>
            }

            {(currentQuestionIndex < quiz?.questions?.length - 1) &&
                <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                >
                    Next Question
                </button>
            }
            <div>
                <button
                    onClick={() => submitQuizAttempt(currentQuizAttempt)}
                >
                    SUBMIT QUIZ
                </button>

            </div>

        </div >
    );

}