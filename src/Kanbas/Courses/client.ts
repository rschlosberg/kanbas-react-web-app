import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const createCourse = async (course: any) => {
 const { data } = await axiosWithCredentials.post(COURSES_API, course);
 return data;
};


export const fetchAllCourses = async () => {
 const { data } = await axiosWithCredentials.get(COURSES_API);
 return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

//////////// ENROLLMENTS
export const addEnrollment = async (enrollment: any) => {
    const response = await axiosWithCredentials.post(
    `${COURSES_API}/enrollments`,
    enrollment
  );
  return response.data;
}

export const deleteEnrollment = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(
    `${COURSES_API}/enrollments/${userId}/${courseId}`,
  );
  return response.data;
}

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};



////////////MODULES

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

//////////////ASSIGMENTS
export const findAssignmentsForCourse = async (assignmentId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${assignmentId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};