import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Question from "./Question";
import { FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import QuizTaker from "./QuizTaker";
import AttemptHistoryTable from "./AttemptHistoryTable";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { StudentQuizDetails } from "./StudentQuizDetails";
import FacultyQuizDetails from "./FacultyQuizDetails";



export default function StudentQuizPage({
    quizzes,

}: {
    quizzes: any;

}) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
    const [quizInProgress, setQuizInProgress] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);


    let quiz = quizzes.find((quiz: any) => quiz._id === qid)

    const attemptsRemaining = quiz?.howManyAttempts - quizAttempts.length;

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
                        {currentUser.role === "FACULTY" ? (
                            <FacultyQuizDetails quiz={quiz} formatDate={formatDate} />
                        ) : (
                            <StudentQuizDetails quiz={quiz} attemptsRemaining={attemptsRemaining} formatDate={formatDate} />
                        )}
                    </div>


                    <hr></hr>
                    <h3>Instructions</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                quiz?.description ||
                                "Proceed with the quiz. Once you start you will not be able to stop the time clock."
                            ,
                        }}
                    ></div>
                    <div className="d-flex justify-content-center mt-3">
                        {currentUser.role === "STUDENT" && quizAttempts.length === quiz?.howManyAttempts ?
                            (<div className="alert alert-warning text-center font-weight-bold mt-3">
                                You have no remaining quiz attempts
                            </div>) :
                            <button className="btn btn-primary me-2" onClick={() => setQuizInProgress(true)}>
                                {currentUser.role === "STUDENT" ? "Take the Quiz" : "Preview the Quiz"}
                            </button>
                        }
                        {currentUser.role === "FACULTY" && (
                            <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}>
                                <FaPencil /> Edit
                            </button>
                        )}
                    </div>
                </>
            }

            {quizInProgress &&
                <>
                    <h3>Instructions</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                quiz?.description ||
                                "Proceed with the quiz. Once you start, you will not be able to stop the time clock."
                        }}
                    ></div>                    <hr></hr>
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