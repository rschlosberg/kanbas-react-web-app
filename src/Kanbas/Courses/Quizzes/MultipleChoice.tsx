import React from "react";


export default function MultipleChoice({ index, question, updateQuestion }: { index: number, question: any, updateQuestion: (question: any) => void }) {



    return (

        <>
            <div className="row mb-2 align-items-center">
                <div className="col"></div>
                <div className="col-auto text-center">
                    <label className="form-label mb-0"><i>*Fill input before marking as correct</i></label>
                </div>
            </div>
            {Array(4).fill(0).map((item, index) => {
                let multipleChoiceOption = "";
                if (question.multipleChoiceOptions?.length) {
                    multipleChoiceOption = question.multipleChoiceOptions[index] || "";
                }

                const isCorrectAnswer = multipleChoiceOption && question.correctAnswers?.includes(multipleChoiceOption);

                return (
                    <div className="row mb-3 align-items-center" key={index}>
                        {/* Choice Input */}
                        <label htmlFor={`wd-choice-${index}`} className="col-auto col-form-label">
                            Choice {index + 1}:
                        </label>
                        <div className="col">
                            <input
                                id={`wd-choice-${index}`}
                                value={multipleChoiceOption}
                                onChange={(e) => {
                                    question.multipleChoiceOptions = question.multipleChoiceOptions || [];
                                    question.multipleChoiceOptions[index] = e.target.value;
                                    let correctAnswers = question.correctAnswers;
                                    if (isCorrectAnswer) {
                                        correctAnswers = [e.target.value];
                                    }
                                    updateQuestion({ ...question, correctAnswers });
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
                                        } else {
                                            correctAnswers = [];
                                        }
                                        updateQuestion({ ...question, correctAnswers });
                                    }}
                                    className="form-check-input"
                                    style={{ transform: "scale(1.5)" }} // Enlarges the checkbox for better visibility
                                />
                                <label className="form-check-label">Correct</label> {/* Optional label */}
                            </div>
                        </div>


                    </div>

                );
            })}
        </>
    )

}