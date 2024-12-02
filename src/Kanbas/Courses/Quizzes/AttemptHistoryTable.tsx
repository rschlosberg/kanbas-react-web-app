import React, { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import AttemptDetail from "./AttemptDetail";

export default function AttemptHistoryTable({ quizAttempts, quiz }: { quizAttempts: any[], quiz: any }) {
    const [selectedAttempt, setSelectedAttempt] = useState(null);

    const handleAttemptClick = (attempt: any) => {
        setSelectedAttempt(attempt);
    };

    return (
        <div className="mt-4">
            <h4 className="mb-3">Attempt History</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Attempt</th>
                            <th scope="col">Date</th>
                            {/* this should be time elapsed like Canvas but don't have that */}
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizAttempts.length > 0 ? (
                            quizAttempts.map((attempt: any, index: number) => (
                                <tr key={attempt._id}>
                                    <td>{index === 0 ? <b>LATEST</b> : ""}</td>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAttemptClick(attempt);
                                            }}
                                        >
                                            {`Attempt ${quizAttempts.length - index}`}
                                        </a>
                                    </td>
                                    <td>{new Date(attempt.attempt).toLocaleString()}</td>
                                    <td>{attempt.pointsEarned || 0}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center">
                                    No attempts yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {selectedAttempt &&
                    <AttemptDetail selectedAttempt={selectedAttempt} setSelectedAttempt={setSelectedAttempt} quiz={quiz} />
                }
            </div>
        </div>
    );
}
