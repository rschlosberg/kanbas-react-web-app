



export default function TrueFalse({ index, question, updateQuestion }: { index: number, question: any, updateQuestion: (question: any) => void }) {

    return (
        <div className="row mb-3 align-items-center">
            <label className="col-auto col-form-label" htmlFor="wd-true-false">
                Select correct answer:
            </label>
            <div className="col">
                <div id="wd-true-false" className="btn-group" role="group">
                    <input
                        type="radio"
                        className="btn-check"
                        name={`true-${index}`}
                        id={`true-option-${index}`}
                        value="true"
                        checked={question.correctAnswers?.[0] === "true"}
                        onChange={() =>
                            updateQuestion({ ...question, correctAnswers: ["true"] })
                        }
                    />
                    <label className="btn btn-outline-primary" htmlFor={`true-option-${index}`}>
                        True
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name={`false-${index}`}
                        id={`false-option-${index}`}
                        value="false"
                        checked={question.correctAnswers?.[0] === "false"}
                        onChange={() =>
                            updateQuestion({ ...question, correctAnswers: ["false"] })
                        }
                    />
                    <label className="btn btn-outline-primary" htmlFor={`false-option-${index}`}>
                        False
                    </label>
                </div>
            </div>
        </div>

    )

}