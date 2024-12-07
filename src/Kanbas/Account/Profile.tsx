import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen container">
      <h1>Profile</h1>
      {profile && (
        <div>
          {/* Username */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.username}
                id="wd-username"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.password}
                id="wd-password"
                type="password"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              />
            </div>
          </div>

          {/* First Name */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-firstname" className="col-sm-3 col-form-label">First Name</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.firstName}
                id="wd-firstname"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-lastname" className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.lastName}
                id="wd-lastname"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-dob" className="col-sm-3 col-form-label">Date of Birth</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.dob}
                id="wd-dob"
                type="date"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-email" className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-9">
              <input
                defaultValue={profile.email}
                id="wd-email"
                className="form-control"
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>

          {/* Role */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="wd-role" className="col-sm-3 col-form-label">Role</label>
            <div className="col-sm-9">
              <select
                id="wd-role"
                className="form-select"
                defaultValue={currentUser?.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              >
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="row mb-3">
            <div className="col-sm-12">
              <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">Update</button>
              <button
                onClick={signout}
                className="btn btn-danger w-100 mb-2"
                id="wd-signout-btn"
                type="button"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}