import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
          <tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span></td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td> </tr>

             <tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Rory</span>{" "}
              <span className="wd-last-name">Gilmore</span></td>
            <td className="wd-login-id">001235555S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2024-07-01</td>
            <td className="wd-total-activity">08:31:32</td> </tr>

             <tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Mary</span>{" "}
              <span className="wd-last-name">Poppins</span></td>
            <td className="wd-login-id">777444111T</td>
            <td className="wd-section">S72</td>
            <td className="wd-role">TEACHER</td>
            <td className="wd-last-activity">2023-10-03</td>
            <td className="wd-total-activity">12:51:52</td> </tr>

             <tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bobby</span>{" "}
              <span className="wd-last-name">Witt</span></td>
            <td className="wd-login-id">0088822233S</td>
            <td className="wd-section">S199</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2021-07-07</td>
            <td className="wd-total-activity">07:21:33</td> </tr>
        </tbody>
      </table>
    </div> );}