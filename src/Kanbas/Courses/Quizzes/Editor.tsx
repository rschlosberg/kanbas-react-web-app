import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Question from "./Question";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


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

  const handleSave = async (fields = quizFields, navString: string) => {
    try {
      if (cid) {
        fields.questions.forEach((question) => {
          question.correctAnswers = question.correctAnswers?.filter((answer) => answer.length > 0);
        });

        if (qid === "Editor") {
          const newQuiz = await coursesClient.createQuizForCourse(cid, fields);
          setQuizzes([...quizzes, newQuiz]);
          navigate(navString);
        } else {
          const updatedQuiz = await quizzesClient.updateQuiz(fields);
          setQuizzes([...quizzes, updatedQuiz]);
          navigate(navString);
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
    return sum + (Number(question.pointsWorth) || 0);
  }, 0); // Initial sum is 0

  const formatDateForInput = (date: any) => {
    if (!date) return ""; // Handle null/undefined cases
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };


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
                <div className="card rounded-3 overflow-hidden mb-3" key={index}>
                  <div className="card-body">
                    <Question
                      key={index}
                      index={index}
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
                className="btn btn-success mt-2"
                onClick={() => {
                  quizFields.questions.push({ type: "MULTIPLE CHOICE" });
                  setQuizFields({ ...quizFields })
                }}
              >
                + New Question
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
            <div className="mb-3" style={{ paddingBottom: "80px" }}>
              <label htmlFor="wd-description" className="form-label">Quiz Instructions</label>
              <ReactQuill
                id="wd-description"
                value={quizFields.description} // Bind value from state
                onChange={(content) => handleInputChange("description", content)} // Update state on change
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                  ],
                }} // Define toolbar options
                theme="snow" // Use default theme
                style={{ height: "100px" }}
              />
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

            <div className="mb-3 p-3 border rounded">
              <h6><b>Options</b></h6>

              {/* Shuffle Questions */}
              <div className="form-check mb-2">
                <input
                  id="wd-shuffleQuestions"
                  type="checkbox"
                  className="form-check-input"
                  checked={quizFields.shuffleQuestions || true}
                  onChange={(e) => handleInputChange("shuffleQuestions", e.target.checked)}
                />
                <label htmlFor="wd-shuffleQuestions" className="form-check-label">Shuffle Questions</label>
              </div>

              {/* Show Correct Answers */}
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

              {/* Allow Multiple Attempts */}
              <div className="form-check mb-2">
                <input
                  id="wd-multipleAttempts"
                  type="checkbox"
                  className="form-check-input"
                  checked={quizFields.multipleAttempts || false}
                  onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
                />
                <label htmlFor="wd-multipleAttempts" className="form-check-label">Allow Multiple Attempts</label>
              </div>

              {/* Numeric Input for Attempts */}
              {quizFields.multipleAttempts && (
                <div className="row align-items-center mb-2">
                  <label htmlFor="wd-howManyAttempts" className="col-auto col-form-label">Number of Attempts:</label>
                  <div className="col-auto">
                    <div className="input-group">
                      <input
                        id="wd-howManyAttempts"
                        type="number"
                        value={quizFields.howManyAttempts || 1}
                        onChange={(e) => handleInputChange("howManyAttempts", Number(e.target.value))}
                        className="form-control"
                        style={{ maxWidth: "80px" }}
                      />
                      <span className="input-group-text">Attempts</span>
                    </div >
                  </div>
                </div>
              )}

              {/* Time Limit */}
              <div className="row align-items-center mb-2">
                <label htmlFor="wd-minutes" className="col-auto col-form-label">
                  Time Limit:
                </label>
                <div className="col-auto">
                  <div className="input-group">
                    <input
                      id="wd-minutes"
                      type="number"
                      className="form-control"
                      value={quizFields.timeLimit || 20}
                      onChange={(e) => handleInputChange("timeLimit", Number(e.target.value))}
                      style={{ maxWidth: "80px" }}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
              </div>

              {/* One Question at a Time */}
              <div className="form-check mb-2">
                <input
                  id="wd-oneQuestionAtATime"
                  type="checkbox"
                  className="form-check-input"
                  checked={quizFields.oneQuestionAtATime || false}
                  onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)}
                />
                <label htmlFor="wd-oneQuestionAtATime" className="form-check-label">One Question at a Time</label>
              </div>

              {/* Webcam Required */}
              <div className="form-check mb-2">
                <input
                  id="wd-webcamRequired"
                  type="checkbox"
                  className="form-check-input"
                  checked={quizFields.webcamRequired || false}
                  onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
                />
                <label htmlFor="wd-webcamRequired" className="form-check-label">Webcam Required</label>
              </div>

              {/* Lock Questions After Answering */}
              <div className="form-check mb-2">
                <input
                  id="wd-lockQuestionsAfterAnswering"
                  type="checkbox"
                  className="form-check-input"
                  checked={quizFields.lockQuestionsAfterAnswering || false}
                  onChange={(e) => handleInputChange("lockQuestionsAfterAnswering", e.target.checked)}
                />
                <label htmlFor="wd-lockQuestionsAfterAnswering" className="form-check-label">Lock Questions After Answering</label>
              </div>


            </div>



            {/* Dates */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-dueDate" className="form-label">Due Date</label>
                <input
                  id="wd-dueDate"
                  type="date"
                  value={formatDateForInput(quizFields.dueDate)}

                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-availableStartDate" className="form-label">Available From</label>
                <input
                  id="wd-availableStartDate"
                  type="date"
                  value={formatDateForInput(quizFields.availableStartDate)}
                  onChange={(e) => handleInputChange("availableStartDate", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="wd-availableUntilDate" className="form-label">Available Until</label>
                <input
                  id="wd-availableUntilDate"
                  type="date"
                  value={formatDateForInput(quizFields.availableUntilDate)}
                  onChange={(e) => handleInputChange("availableUntilDate", e.target.value)}
                  className="form-control"
                />
              </div>
            </div>




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
            handleSave(updatedFields, `/Kanbas/Courses/${cid}/quizzes`);
          }}
        >
          Save & Publish
        </button>

        <button
          className="btn btn-primary"
          onClick={() => handleSave(quizFields, `/Kanbas/Courses/${cid}/quizzes/StudentQuizPage/${qid}`)}
        >
          Save
        </button>
      </div>
    </div >
  );

}
