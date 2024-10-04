import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-grow-1 me-5">
        <Modules />
      </div>
      <div className="d-none d-lg-block me-3">
        <CourseStatus />
      </div>
    </div>

  );
}
