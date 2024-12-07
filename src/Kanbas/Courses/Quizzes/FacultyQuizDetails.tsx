import React from "react";

const FacultyQuizDetails = ({ quiz, formatDate }: { quiz: any, formatDate: any }) => {
    // const formatDate = (date: string) => {
    //     if (!date) return "N/A";
    //     const formatted = new Date(date).toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //     });
    //     return formatted;
    // };

    const totalPoints = quiz.questions?.reduce((sum: number, question: any) => {
        return sum + (Number(question.pointsWorth) || 0);
    }, 0);

    return (
        <div>
            {/* Quiz Type */}
            <div>
                <strong>Quiz Type:</strong> {quiz.quizType || "Graded Quiz"}
            </div>

            {/* Points */}
            <div>
                <strong>Points:</strong> {totalPoints || "0"}
            </div>

            {/* Assignment Group */}
            <div>
                <strong>Assignment Group:</strong> {quiz.assignmentGroup || "Quizzes"}
            </div>

            {/* Shuffle Answers */}
            <div>
                <strong>Shuffle Answers:</strong> {quiz.shuffleQuestions ? "Yes" : "No"}
            </div>

            {/* Time Limit */}
            <div>
                <strong>Time Limit:</strong>{" "}
                {quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "20 Minutes"}
            </div>

            {/* Multiple Attempts */}
            <div>
                <strong>Multiple Attempts:</strong>{" "}
                {quiz.multipleAttempts ? "Yes" : "No"}
            </div>

            {/* How Many Attempts */}
            {quiz.multipleAttempts && (
                <div>
                    <strong>How Many Attempts:</strong>{" "}
                    {quiz.howManyAttempts || "1"}
                </div>
            )}

            {/* Show Correct Answers */}
            <div>
                <strong>Show Correct Answers:</strong>{" "}
                {quiz.showCorrectAnswers ? "Yes" : "No"}
            </div>

            {/* Access Code */}
            <div>
                <strong>Access Code:</strong> {quiz.accessCode || "None"}
            </div>

            {/* One Question at a Time */}
            <div>
                <strong>One Question at a Time:</strong>{" "}
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </div>

            {/* Webcam Required */}
            <div>
                <strong>Webcam Required:</strong>{" "}
                {quiz.webcamRequired ? "Yes" : "No"}
            </div>

            {/* Lock Questions After Answering */}
            <div>
                <strong>Lock Questions After Answering:</strong>{" "}
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </div>

            {/* Due Date */}
            <div>
                <strong>Due Date:</strong> {formatDate(quiz.dueDate)}
            </div>

            {/* Available Date */}
            <div>
                <strong>Available Date:</strong>{" "}
                {formatDate(quiz.availableStartDate)}
            </div>

            {/* Until Date */}
            <div>
                <strong>Until Date:</strong>{" "}
                {formatDate(quiz.availableUntilDate)}
            </div>
        </div>
    );
};

export default FacultyQuizDetails;
