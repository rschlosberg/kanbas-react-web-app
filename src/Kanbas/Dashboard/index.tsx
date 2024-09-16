import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">

          <img src="/images/teslabot.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
                CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
                Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5001/Home">
                CS5001 Intro to Python
            </Link>
            <p className="wd-dashboard-course-title">
                Intro to programming with Python
            </p>
            <Link to="/Kanbas/Courses/5001/Home"> Go </Link>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5002/Home">
                CS5002 Discrete Structures
            </Link>
            <p className="wd-dashboard-course-title">
                Learn discrete structures needed for software development
            </p>
            <Link to="/Kanbas/Courses/5002/Home"> Go </Link>
            </div>
        </div>
           <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5004/Home">
                CS5004 OOD
            </Link>
            <p className="wd-dashboard-course-title">
                Object Oriented Programming
            </p>
            <Link to="/Kanbas/Courses/5004/Home"> Go </Link>
            </div>
        </div>
           <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5610/Home">
                CS5610 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
                Modern web development
            </p>
            <Link to="/Kanbas/Courses/5002/Home"> Go </Link>
            </div>
        </div>
           <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5008/Home">
                CS5008 Data structures and algorithms
            </Link>
            <p className="wd-dashboard-course-title">
                Data structures and algorithms
            </p>
            <Link to="/Kanbas/Courses/5002/Home"> Go </Link>
            </div>
        </div>
           <div className="wd-dashboard-course">
            <img src="/images/teslabot.jpg" width={200} />
            <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5002/Home">
                CS5800 Algorithms
            </Link>
            <p className="wd-dashboard-course-title">
                Algorithms
            </p>
            <Link to="/Kanbas/Courses/5002/Home"> Go </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
