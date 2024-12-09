import React from "react";

export default function MultipleChoice({
    index,
    question,
    updateQuestion,
}: {
    index: number;
    question: any;
    updateQuestion: (question: any) => void;
}) {
    let possibleChoices = question.multipleChoiceOptions || [""];

    return (
        <>
            <div className="row mb-2 align-items-center">
                <div className="col"></div>
                <div className="col-auto text-center">
                    <label className="form-label mb-0">
                        <i>*Fill input before marking as correct</i>
                    </label>
                </div>
            </div>
            {possibleChoices.map((item: string, idx: number) => {
                const multipleChoiceOption =
                    question.multipleChoiceOptions?.[idx] || "";
                const isCorrectAnswer =
                    multipleChoiceOption &&
                    question.correctAnswers?.includes(multipleChoiceOption);

                return (
                    <div className="row mb-3 align-items-center" key={idx}>
                        {/* Choice Input */}
                        <label
                            htmlFor={`wd-choice-${idx}`}
                            className="col-auto col-form-label"
                        >
                            Choice {idx + 1}:
                        </label>
                        <div className="col">
                            <input
                                id={`wd-choice-${idx}`}
                                value={multipleChoiceOption}
                                onChange={(e) => {
                                    const updatedChoices = [...(question.multipleChoiceOptions || [])];
                                    updatedChoices[idx] = e.target.value;
                                    let correctAnswers = question.correctAnswers || [];
                                    if (isCorrectAnswer) {
                                        correctAnswers = [e.target.value];
                                    }
                                    updateQuestion({
                                        ...question,
                                        multipleChoiceOptions: updatedChoices,
                                        correctAnswers,
                                    });
                                }}
                                className="form-control"
                            />
                        </div>

                        {/* Checkbox for Correct Choice */}
                        <div className="col-auto text-center ms-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    checked={isCorrectAnswer}
                                    onChange={(e) => {
                                        let correctAnswers: any[] = [];
                                        if (e.target.checked && multipleChoiceOption) {
                                            correctAnswers = [multipleChoiceOption];
                                        }
                                        updateQuestion({ ...question, correctAnswers });
                                    }}
                                    className="form-check-input"
                                    style={{ transform: "scale(1.5)" }} // Enlarges the checkbox for better visibility
                                />
                                <label className="form-check-label">Correct</label>
                            </div>
                        </div>

                        {/* Delete Choice Button */}
                        <div className="col-auto ms-3">
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedChoices = possibleChoices.filter(
                                        (_: string, i: number) => i !== idx
                                    );
                                    let correctAnswers = question.correctAnswers || [];
                                    // Remove the correct answer if it matches the deleted choice
                                    correctAnswers = correctAnswers.filter(
                                        (answer: string) => answer !== multipleChoiceOption
                                    );
                                    updateQuestion({
                                        ...question,
                                        multipleChoiceOptions: updatedChoices,
                                        correctAnswers,
                                    });
                                }}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Add Choice Button */}
            <div className="row mt-3">
                <div className="col">
                    <button
                        type="button"
                        onClick={() => {
                            const updatedChoices = [...possibleChoices, ""];
                            updateQuestion({
                                ...question,
                                multipleChoiceOptions: updatedChoices,
                            });
                        }}
                        className="btn btn-secondary"
                    >
                        + Add Choice
                    </button>
                </div>
            </div>
        </>
    );
}
