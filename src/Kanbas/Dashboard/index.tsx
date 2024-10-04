import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS1234 React JS
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Full Stack software developer
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

             <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5001/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5001 Intro to Python
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Intro to programming with Python
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5002/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5002 Discrete Structures
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Learn discrete structures needed for software development
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5004/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5004 OOD
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Object Oriented Programming
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5610/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5610 Web Development
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Modern web development
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5008/Home">
                    <img src="/images/teslabot.jpg" width={260} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5008 Data Structures and Algorithms
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Data structures and algorithms
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/5800/Home">
                    <img src="/images/teslabot.jpg" width={200} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        CS5800 Algorithms
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Algorithms
                    </p>
                    <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
