import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

//////////// ENROLLMENTS
export const addEnrollment = async (enrollment: any) => {
    const response = await axios.post(
    `${COURSES_API}/enrollments`,
    enrollment
  );
  return response.data;
}

export const deleteEnrollment = async (userId: string, courseId: string) => {
    const response = await axios.delete(
    `${COURSES_API}/enrollments/${userId}/${courseId}`,
  );
  console.log(response)
  return response.data;
}




////////////MODULES

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
    console.log(response.data)
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
    console.log(response.data)
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};