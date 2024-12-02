import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Question from "./Question";
import { FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import QuizTaker from "./QuizTaker";
import AttemptHistoryTable from "./AttemptHistoryTable";


export default function StudentQuizPage({
    quizzes,

}: {
    quizzes: any;

}) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quizAttempts, setQuizAttempts] = useState<any[]>([]);

    const [quizInProgress, setQuizInProgress] = useState(false);

    let quiz = quizzes.find((quiz: any) => quiz._id === qid)

    const fetchQuizAttempts = async () => {
        const quizAttempts = await quizzesClient.getQuizAttempts(qid as string);
        setQuizAttempts(quizAttempts);
    };
    useEffect(() => {
        fetchQuizAttempts();
    }, [qid]);


    //use effect to get quiz attempts

    const submitQuizAttempt = async (quizAttempt: any) => {
        const newAttempt = await quizzesClient.postQuizAttempt(quizAttempt);
        setQuizAttempts([...quizAttempts, newAttempt])

        navigate(`/Kanbas/Courses/${cid}/quizzes/studentquizpage/${quiz._id}`);

    }

    const formatDate = (isoString: any) => {
        return format(new Date(isoString), "MMM d 'at' h:mmaaa");
    };

    return (
        <div>
            <h3>{quiz?.title}</h3>
            <hr />

            {!quizInProgress &&
                <>


                    <div>
                        <strong>Due:</strong> {quiz?.dueDate ? formatDate(quiz.dueDate) : "No due date"}
                    </div>
                    <div>
                        <strong>Points Possible:</strong> {quiz?.points}
                    </div>
                    <div>
                        <strong>Questions</strong> {quiz?.questions?.length}
                    </div>
                    <div>
                        <strong>Available </strong>
                        {quiz?.availableStartDate
                            ? formatDate(quiz.availableStartDate)
                            : "No start date"}
                        {quiz?.availableUntilDate
                            ? ` - ${formatDate(quiz.availableUntilDate)}`
                            : quiz?.availableStartDate
                                ? " - No end date"
                                : ""}
                    </div>

                    <div>
                        <strong>Time Limit</strong> {quiz?.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
                    </div>
                    <div>
                        <strong>Allowed Attempts</strong> {quiz?.multipleAttempts ? quiz.howManyAttempts : "Single attempt"}
                    </div>

                    <hr></hr>
                    <h3>Instructions</h3>
                    <div>{quiz?.description || "Proceed with the quiz. Once you start you will not be able to stop the time clock."}</div>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary" onClick={() => setQuizInProgress(true)}>
                            Take the Quiz
                        </button>
                    </div>
                </>
            }

            {quizInProgress &&
                <>
                    <h3>Instructions</h3>
                    <div>{quiz?.description || "Proceed with the quiz. Once you start you will not be able to stop the time clock."}</div>
                    <hr></hr>
                    <div>
                        <QuizTaker quiz={quiz} submitQuizAttempt={submitQuizAttempt} />
                    </div>
                </>
            }

            {!quizInProgress &&
                <AttemptHistoryTable quizAttempts={quizAttempts} quiz={quiz} />
            }

        </div>
    );

}