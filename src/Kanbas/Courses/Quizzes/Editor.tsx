import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Question from "./Question";
import { FaTrash } from "react-icons/fa";


export default function QuizEditor({ quizzes, setQuizzes }: { quizzes: any, setQuizzes: (quiz: any) => void }) {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  let quiz = quizzes.find((quiz: any) => quiz._id === qid)

  //reconfigure if editing a quiz
  const [quizFields, setQuizFields] = useState<{
    course: string;
    title: string;
    description: string;
    published: boolean;
    dueDate: string;
    availableStartDate: string;
    availableUntilDate: string;
    points: number;
    quizType: string;
    assignmentGroup: string;
    shuffleQuestions: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    howManyAttempts: number;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    questions: {
      type: string;
      questionText?: string;
      multipleChoiceOptions?: string[];
      correctAnswers?: string[];
      pointsWorth?: number;
    }[];
  }>(quiz || {
    course: "",
    title: "",
    description: "",
    published: false,
    dueDate: "",
    availableStartDate: "",
    availableUntilDate: "",
    points: 0,
    quizType: "GRADED QUIZ",
    assignmentGroup: "QUIZZES",
    shuffleQuestions: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    questions: [
    ], // Explicitly typed as an array of question objects
  });

  const [activeTab, setActiveTab] = useState<"details" | "questions">("details")

  const handleInputChange = (field: string, value: any) => {
    setQuizFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSave = async (fields = quizFields) => {
    try {
      if (cid) {
        fields.questions.forEach((question) => {
          question.correctAnswers = question.correctAnswers?.filter((answer) => answer.length > 0);
        });

        if (qid === "Editor") {
          const newQuiz = await coursesClient.createQuizForCourse(cid, fields);
          setQuizzes([...quizzes, newQuiz]);
          navigate(`/Kanbas/Courses/${cid}/quizzes`);
        } else {
          const updatedQuiz = await quizzesClient.updateQuiz(fields);
          setQuizzes([...quizzes, updatedQuiz]);
          navigate(`/Kanbas/Courses/${cid}/quizzes`);
        }
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };


  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };

  const totalPoints = quizFields.questions?.reduce((sum, question) => {
    return sum + (question.pointsWorth || 0);
  }, 0); // Initial sum is 0


  return (
    <div id="wd-quiz-editor" className="container mt-4">
      <>
        <h3>{qid === "Editor" ? "Create Quiz" : "Edit Quiz"}</h3>
        <div>Total Points: {totalPoints}</div>
        <div>{quizFields.published ? "Published" : "Not Published"}</div>

        {/* Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
              onClick={() => setActiveTab("questions")}
            >
              Questions
            </button>
          </li>
        </ul>
      </>

      {/* Tab Content */}
      <>
        <div className="tab-content mt-4">
          {activeTab === "questions" && (
            <>

              {quizFields.questions.map((q, index) => (
                <div className="card rounded-3 overflow-hidden">
                  <div className="card-body">
                    <Question
                      key={index}
                      question={q}
                      updateQuestion={(updatedQuestion: any) => {
                        const updatedQuestions = [...quizFields.questions];
                        updatedQuestions[index] = updatedQuestion;
                        setQuizFields((prevFields) => ({
                          ...prevFields,
                          questions: updatedQuestions,
                        }));
                      }}
                    />
                    <button
                      className="btn btn-secondary mt-2 float-end"

                      onClick={() => {
                        const updatedQuestions = quizFields.questions.filter((_, i) => i !== index);
                        setQuizFields((prevFields) => ({
                          ...prevFields,
                          questions: updatedQuestions,
                        }));
                      }}
                    >
                      <FaTrash className="text-danger me-2 mb-1" /> Delete Question
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  quizFields.questions.push({ type: "MULTIPLE CHOICE" });
                  setQuizFields({ ...quizFields })
                }}
              >
                New Question
              </button>
            </>
          )}
        </div>
      </>

      <div className="tab-content mt-4">
        {activeTab === "details" && (
          <div>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="wd-title" className="form-label">Quiz Title</label>
              <input
                id="wd-title"
                value={quizFields.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="form-control"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="wd-description" className="form-label">Description</label>
              <textarea
                id="wd-description"
                value={quizFields.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={5}
                className="form-control"
              />
            </div>

            {/* Points */}
            {/* <div className="mb-3">
              <label htmlFor="wd-points" className="form-label">Total Points</label>
              <input
                id="wd-points"
                type="number"
                value={quizFields.points}
                onChange={(e) => handleInputChange("points", Number(e.target.value))}
                className="form-control"
              />
            </div> */}

            {/* Dates */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-dueDate" className="form-label">Due Date</label>
                <input
                  id="wd-dueDate"
                  type="date"
                  value={quizFields.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-availableStartDate" className="form-label">Available From</label>
                <input
                  id="wd-availableStartDate"
                  type="date"
                  value={quizFields.availableStartDate}
                  onChange={(e) => handleInputChange("availableStartDate", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-availableUntilDate" className="form-label">Available Until</label>
                <input
                  id="wd-availableUntilDate"
                  type="date"
                  value={quizFields.availableUntilDate}
                  onChange={(e) => handleInputChange("availableUntilDate", e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Quiz Type */}
            <div className="mb-3">
              <label htmlFor="wd-quizType" className="form-label">Quiz Type</label>
              <select
                id="wd-quizType"
                value={quizFields.quizType}
                onChange={(e) => handleInputChange("quizType", e.target.value)}
                className="form-select"
              >
                <option value="GRADED QUIZ">GRADED QUIZ</option>
                <option value="PRACTICE QUIZ">PRACTICE QUIZ</option>
                <option value="GRADED SURVEY">GRADED SURVEY</option>
                <option value="UNGRADED SURVEY">UNGRADED SURVEY</option>
              </select>
            </div>

            {/* Assignment Group */}
            <div className="mb-3">
              <label htmlFor="wd-assignmentGroup" className="form-label">Assignment Group</label>
              <select
                id="wd-assignmentGroup"
                value={quizFields.assignmentGroup}
                onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
                className="form-select"
              >
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </div>

            {/* Boolean Options */}
            <div className="form-check mb-2">
              <input
                id="wd-shuffleQuestions"
                type="checkbox"
                className="form-check-input"
                checked={quizFields.shuffleQuestions}
                onChange={(e) => handleInputChange("shuffleQuestions", e.target.checked)}
              />
              <label htmlFor="wd-shuffleQuestions" className="form-check-label">Shuffle Questions</label>
            </div>

            <div className="form-check mb-2">
              <input
                id="wd-showCorrectAnswers"
                type="checkbox"
                className="form-check-input"
                checked={quizFields.showCorrectAnswers}
                onChange={(e) => handleInputChange("showCorrectAnswers", e.target.checked)}
              />
              <label htmlFor="wd-showCorrectAnswers" className="form-check-label">Show Correct Answers</label>
            </div>

            <div className="mb-2">
              <input
                id="wd-minutes"
                className="form-input"
                value={quizFields.timeLimit}
                onChange={(e) => handleInputChange("timeLimit", e.target.value)}
              />
              <label htmlFor="wd-showCorrectAnswers" className="form-label"> Minutes</label>
            </div>


            <div className="form-check mb-2">
              <input
                id="wd-multipleAttempts"
                type="checkbox"
                className="form-check-input"
                checked={quizFields.multipleAttempts}
                onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
              />
              <label htmlFor="wd-multipleAttempts" className="form-check-label">Allow Multiple Attempts</label>
            </div>

            {/* Numeric Input for Attempts */}
            {quizFields.multipleAttempts && (
              <div className="mb-3">
                <label htmlFor="wd-howManyAttempts" className="form-label">How Many Attempts</label>
                <input
                  id="wd-howManyAttempts"
                  type="number"
                  value={quizFields.howManyAttempts}
                  onChange={(e) => handleInputChange("howManyAttempts", Number(e.target.value))}
                  className="form-control"
                />
              </div>
            )}

            {/* Access Code */}
            <div className="mb-3">
              <label htmlFor="wd-accessCode" className="form-label">Access Code</label>
              <input
                id="wd-accessCode"
                value={quizFields.accessCode}
                onChange={(e) => handleInputChange("accessCode", e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save and Cancel */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            const updatedFields = { ...quizFields, published: true };
            setQuizFields(updatedFields);
            handleSave(updatedFields);
          }}
        >
          Save & Publish
        </button>
        <button className="btn btn-primary" onClick={() => handleSave(quizFields)}>Save</button>
      </div>
    </div >
  );

}
