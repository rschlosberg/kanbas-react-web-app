import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function EnrolledCourseRoute({ children, enrolledCourses }: { children: any; enrolledCourses: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();

  const isEnrolled = enrolledCourses.some((enrollment: any) => enrollment.course === cid && currentUser._id === enrollment.user);

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  if (currentUser.role === "STUDENT" && isEnrolled) {
    return <>{children}</>;
  }

  return <Navigate to="/Kanbas/Dashboard/" />;
}
