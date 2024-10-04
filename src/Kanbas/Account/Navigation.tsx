import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
      <Link to={`/Kanbas/Account/Signin`}  className="list-group-item text-danger border border-0"> Signin  </Link> <br/>
      <Link to={`/Kanbas/Account/Signup`}  className="list-group-item text-danger border border-0"> Signup  </Link> <br/>
      <Link to={`/Kanbas/Account/Profile`} className="list-group-item text-danger border border-0"> Profile </Link> <br/>
    </div>
);}
