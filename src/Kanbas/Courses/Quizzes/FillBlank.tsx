import { FaTrash, FaTimes } from "react-icons/fa";

export default function FillBlank({ question, updateQuestion }: { question: any, updateQuestion: (question: any) => void }) {
    let correctAnswers = question.correctAnswers || [""];


    return (
        <div>
            <label className="form-label"><h6><i>Possible Correct Answers</i></h6></label>
            {correctAnswers.map((answer: string, index: number) => (
                <div className="row mb-3 align-items-center" key={index}>
                    <label htmlFor={`correct-answer-${index}`} className="col-auto col-form-label">
                        Answer {index + 1}:
                    </label>
                    <div className="col">
                        <input
                            id={`correct-answer-${index}`}
                            type="text"
                            value={answer}
                            onChange={(e) => {
                                correctAnswers[index] = e.target.value;
                                // if (e.target.value) {
                                //     correctAnswers = [multipleChoiceOption];
                                // } else {
                                //     correctAnswers = [];
                                // }
                                updateQuestion({ ...question, correctAnswers });
                            }}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button
                            className="btn me-1"
                            onClick={() => {
                                correctAnswers = correctAnswers.filter((correctAnswer: any, i: number) => i !== index)
                                updateQuestion({ ...question, correctAnswers });
                            }}
                        >
                            <FaTimes className="text-danger me-2 mb-1" />
                        </button>
                    </div >
                </div>
            ))}
            <button
                type="button"
                onClick={() => {
                    const updatedAnswers = [...correctAnswers, ""];
                    updateQuestion({ ...question, correctAnswers: updatedAnswers });
                }}
                className="btn btn-secondary mt-2"
            >
                + Add Answer
            </button>
        </div >
    );

}