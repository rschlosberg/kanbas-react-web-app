import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";
import { format } from "date-fns";



export default function AttemptDetail({ selectedAttempt, quiz, setSelectedAttempt }: { selectedAttempt: any, quiz: any, setSelectedAttempt: (attempt: any) => void; }) {


    const findMatchedAttemptAnswerObject = (question: any) => {
        const matchedAnswer = selectedAttempt?.answers?.find(
            (answer: any) => answer.questionId.toString() === question._id.toString()
        );

        return matchedAnswer || null;
    }

    const renderOutcomeIcon = (question: any) => {
        const matchedAnswer = findMatchedAttemptAnswerObject(question);

        if (matchedAnswer) {
            if (matchedAnswer.isCorrectAnswer) {
                // Render green checkmark
                return <FaCheckCircle className="text-success" size={24} />;
            }

            // Render red X
            return <FaTimesCircle className="text-danger" size={24} />;
        }

        // Render muted question mark if no answer
        return <FaQuestionCircle className="text-secondary" size={24} />;
    };

    const formatDate = (isoString: any) => {
        return format(new Date(isoString), "MMM d 'at' h:mmaaa");
    };


    return (
        <div className="mt-4">
            <hr></hr>
            <div>
                <div>Score for this quiz: <strong>{selectedAttempt.pointsEarned}</strong> out of {quiz.points}</div>
                <div>Submitted {formatDate(selectedAttempt.attempt)}</div>
            </div >
            <br></br>
            {
                quiz.questions?.map((question: any, index: number) => (
                    <div className="card mb-4 shadow-sm" key={index}>
                        {/* Question Title */}
                        <h5 className="card-header bg-light">
                            {renderOutcomeIcon(question)}
                            <span className="ms-2">{`Question ${index + 1}: ${question.questionText}`}</span>
                            <span className="float-end">{findMatchedAttemptAnswerObject(question).isCorrectAnswer ? question.pointsWorth : 0}/{question.pointsWorth} pts</span>
                        </h5>

                        {/* Display Choices */}
                        <div className="card-body">
                            {question.type === "MULTIPLE CHOICE" && (
                                <ul className="list-group list-group-flush">
                                    <label className="form-label">
                                        <b>Your Answer:</b>{" "}
                                        {!findMatchedAttemptAnswerObject(question)?.answer ? (
                                            <i>No answer selected</i>
                                        ) : (
                                            findMatchedAttemptAnswerObject(question).answer
                                        )}
                                    </label>

                                    {question.multipleChoiceOptions?.map((choice: any, idx: number) => (
                                        <li
                                            className={`list-group-item d-flex justify-content-center align-items-center py-3 ${findMatchedAttemptAnswerObject(question).answer === choice
                                                ? "list-group-item-primary"
                                                : ""
                                                }`}
                                            key={idx}
                                        >
                                            <span className="text-center">{choice}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {question.type === "TRUE/FALSE" && (
                                <div className="mt-3 text-center">
                                    <label className="form-label d-block fw-bold">Your Answer:</label>
                                    <div className="btn-group" role="group">
                                        <button
                                            type="button"
                                            className={`btn ${findMatchedAttemptAnswerObject(question).answer === "true"
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                                }`}
                                            style={{
                                                pointerEvents: "none",
                                                cursor: "default",
                                                opacity: "1",
                                            }}
                                        >
                                            True
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${findMatchedAttemptAnswerObject(question).answer === "false"
                                                ? "btn-danger"
                                                : "btn-outline-secondary"
                                                }`}
                                            style={{
                                                pointerEvents: "none",
                                                cursor: "default",
                                                opacity: "1",
                                            }}
                                        >
                                            False
                                        </button>

                                    </div>
                                    {!findMatchedAttemptAnswerObject(question).answer &&
                                        <div className="mt-2"><i>No answer selected</i></div>
                                    }
                                </div>
                            )}

                            {question.type === "FILL IN THE BLANK" && (
                                <div className="mt-3 text-center">
                                    <label className="form-label fw-bold">Your Answer:</label>
                                    <textarea
                                        className="form-control text-center"
                                        value={findMatchedAttemptAnswerObject(question)?.answer || "No answer provided"}
                                        readOnly
                                        rows={1}
                                        style={{
                                            borderRadius: "5px",
                                            backgroundColor: "#f8f9fa",
                                            border: "1px solid #ced4da",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))
            }
            < button
                className="btn btn-secondary float-end"
                onClick={() => setSelectedAttempt(null)
                }
            >
                Hide Attempt
            </button >






        </div >
    );

}
