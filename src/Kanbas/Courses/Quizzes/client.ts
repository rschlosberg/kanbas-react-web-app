import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
 const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
 return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return data;
};

export const postQuizAttempt = async (quizAttempt: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZ_API}/attempts`, quizAttempt);
  return data;
};

export const getQuizAttempts = async (quizId: any) => {
  const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/attempts`);
  return data;
};