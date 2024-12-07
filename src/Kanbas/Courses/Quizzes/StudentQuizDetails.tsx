export const StudentQuizDetails = ({ quiz, attemptsRemaining, formatDate }: { quiz: any; attemptsRemaining: number, formatDate: any }) => {
    return (
        <div>
            <div>
                <strong>Due:</strong> {quiz?.dueDate ? formatDate(quiz.dueDate) : "No due date"}
            </div>
            <div>
                <strong>Points Possible:</strong> {quiz?.points}
            </div>
            <div>
                <strong>Questions:</strong> {quiz?.questions?.length}
            </div>
            <div>
                <strong>Available:</strong>{" "}
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
                <strong>Time Limit:</strong>{" "}
                {quiz?.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
            </div>
            <div>
                <strong>Allowed Attempts:</strong>{" "}
                {quiz?.multipleAttempts ? quiz?.howManyAttempts : "Single attempt"}
            </div>
            <div>
                <strong>Attempts Remaining:</strong> {attemptsRemaining}
            </div>
        </div>
    );
};