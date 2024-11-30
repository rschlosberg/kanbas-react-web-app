



export default function TrueFalse({ question, updateQuestion }: { question: any, updateQuestion: (question: any) => void }) {

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
                        name="true-false"
                        id="true-option"
                        value="true"
                        checked={question.correctAnswers?.[0] === "true"}
                        onChange={() =>
                            updateQuestion({ ...question, correctAnswers: ["true"] })
                        }
                    />
                    <label className="btn btn-outline-primary" htmlFor="true-option">
                        True
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="true-false"
                        id="false-option"
                        value="false"
                        checked={question.correctAnswers?.[0] === "false"}
                        onChange={() =>
                            updateQuestion({ ...question, correctAnswers: ["false"] })
                        }
                    />
                    <label className="btn btn-outline-primary" htmlFor="false-option">
                        False
                    </label>
                </div>
            </div>
        </div>

    )

}