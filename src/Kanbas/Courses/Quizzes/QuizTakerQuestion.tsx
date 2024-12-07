export default function QuizTakerQuestion({
    question,
    answer,
    setAnswer

}: {
    question: any;
    answer: any;
    setAnswer: (questionId: any, answer: any) => void;
}) {


    return (
        <div className="card mb-3">
            {/* <div className="card-header">
                <strong>Question {currentQuestionIndex + 1} of {totalQuestions}</strong>
            </div> */}
            <div className="card-body">
                <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: question?.questionText }}
                ></p>

                {question.type === "MULTIPLE CHOICE" && (
                    <div>
                        {question.multipleChoiceOptions?.map((option: any, index: number) => (
                            <div className="form-check" key={index}>
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id={`option-${index}`}
                                    checked={answer === option}
                                    value={option}
                                    onChange={(e) => setAnswer(question._id, e.target.value)}
                                />
                                <label htmlFor={`option-${index}`} className="form-check-label">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {question.type === "FILL IN THE BLANK" && (
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your answer"
                            value={answer}
                            onChange={(e) => setAnswer(question._id, e.target.value)}
                        />
                    </div>
                )}

                {question.type === "TRUE/FALSE" && (
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={answer === "true"}
                                value="true"
                                onChange={(e) => setAnswer(question._id, e.target.value)}
                            />
                            <label htmlFor="true" className="form-check-label">True</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={answer === "false"}
                                id="false"
                                value="false"
                                onChange={(e) => setAnswer(question._id, e.target.value)}
                            />
                            <label htmlFor="false" className="form-check-label">False</label>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );

}