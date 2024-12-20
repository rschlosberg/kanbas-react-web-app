import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
          Lab 5
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/rschlosberg/kanbas-react-web-app" className="nav-link">
          GitHub Frontend Repo
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/rschlosberg/kanbas-node-server-app" className="nav-link">
          GitHub Server Repo
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://kanbas-node-server-app-rschlos-5a567547fb3b.herokuapp.com/" className="nav-link">
          Heroku
        </a>
      </li>
    </ul>
  );
}



// import { Link } from "react-router-dom";

// export default function TOC() {
//   return (
//     <ul>
//       <li><Link to="/Labs/Lab1">Lab 1</Link></li>
//       <li><Link to="/Labs/Lab2">Lab 2</Link></li>
//       <li><Link to="/Labs/Lab3">Lab 3</Link></li>
//       <li><Link to="/Kanbas">Kanbas</Link></li>
//       <li><a href="https://github.com/rschlosberg/kanbas-react-web-app" id="wd-github-link" target="_blank">Source Code</a></li>
//     </ul>
//   );
// }
