// import React, { useState } from "react";
// // import { updateUsername, updateEmail, updatePassword } from "../data/repository";

// function ProfileManagement() {
//   const [currentUsername, setCurrentUsername] = useState("");
//   const [newUsername, setNewUsername] = useState("");
//   const [currentEmail, setCurrentEmail] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleUpdateUsername = () => {
//     const success = updateUsername(currentUsername, newUsername);
//     setMessage(success ? "Username updated successfully." : "Failed to update username.");
//   };

//   const handleUpdateEmail = () => {
//     const success = updateEmail(currentEmail, newEmail);
//     setMessage(success ? "Email updated successfully." : "Failed to update email.");
//   };

//   const handleChangePassword = () => {
//     const success = updatePassword(currentPassword, newPassword);
//     setMessage(success ? "Password changed successfully." : "Failed to change password.");
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4 mb-4">Profile Management</h2>

//       <div className="card">
//         <div className="card-body">
//           <h4 className="card-title">Update Username</h4>
//           <div className="form-group">
//             <input type="text" className="form-control" value={currentUsername} onChange={(e) => setCurrentUsername(e.target.value)} placeholder="Current Username" />
//           </div>
//           <div className="form-group">
//             <input type="text" className="form-control" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New Username" />
//           </div>
//           <button className="btn btn-primary" onClick={handleUpdateUsername}>Update Username</button>
//         </div>
//       </div>

//       <div className="card mt-4">
//         <div className="card-body">
//           <h4 className="card-title">Update Email</h4>
//           <div className="form-group">
//             <input type="text" className="form-control" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} placeholder="Current Email" />
//           </div>
//           <div className="form-group">
//             <input type="email" className="form-control" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" />
//           </div>
//           <button className="btn btn-primary" onClick={handleUpdateEmail}>Update Email</button>
//         </div>
//       </div>

//       <div className="card mt-4">
//         <div className="card-body">
//           <h4 className="card-title">Change Password</h4>
//           <div className="form-group">
//             <input type="text" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" />
//           </div>
//           <div className="form-group">
//             <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
//           </div>
//           <button className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
//         </div>
//       </div>

//       {message && <div className="alert mt-4 alert-info">{message}</div>}
//     </div>
//   );
// }

// export default ProfileManagement;

import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserByUsername, updateUser } from "../data/repository";
import MessageContext from "../contexts/MessageContext";

export default function MyProfileManagement(props) {
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState({ });
  const navigate = useNavigate();
  const { username } = useParams();
  const { setMessage } = useContext(MessageContext);

  // Load User.
  useEffect(() => {
    async function loadUser() {
      const currentUser = getUserByUsername(username);

      setUser(currentUser);
      setFieldsNullToEmpty(currentUser);
    }
    loadUser();
  }, [username]);

  // Ensure null is not used when setting fields.
  const setFieldsNullToEmpty = (currentFields) => {
    // Make a copy of currentFields so the original parameter is not modified.
    currentFields = { ...currentFields };

    for(const [key, value] of Object.entries(currentFields)) {
      currentFields[key] = value !== null ? value : "";
    }

    setFields(currentFields);
  };

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;

    // Update user.
    const user = await updateUser(trimmedFields);

    // Show success message.
    setMessage(<><strong>{user.first_name} {user.last_name}</strong> profile has been updated successfully.</>);

    // Navigate to the users page.
    navigate("/profile");
  };

  const handleValidation = () => {
    const trimmedFields = trimFieldsEmptyToNull();
    const currentErrors = { };

    let key = "first_name";
    let field = trimmedFields[key];
    if(field === null)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "last_name";
    field = trimmedFields[key];
    if(field === null)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  // Note: Empty fields are converted to null.
  const trimFieldsEmptyToNull = () => {
    const trimmedFields = { };

    for(const [key, value] of Object.entries(fields)) {
      let field = value;

      // If value is not null trim the field.
      if(field !== null) {
        field = field.trim();

        // If the trimmed field is empty make it null.
        if(field.length === 0)
          field = null;
      }

      trimmedFields[key] = field;
    }

    setFieldsNullToEmpty(trimmedFields);

    return trimmedFields;
  };

  if(username === null || fields === null)
    return null;

  return (
    <div style={{ backgroundColor: "#f5f6fa" }}>
      <div>
        <div className="row">
          <div className="col-12 col-md-3 bg-white">
            <div className="text-center mt-2">
              <div>
                <i className="bi bi-person-circle" style={{ fontSize: 75 }}></i>
              </div>
              <h5>{user.first_name} {user.last_name}</h5>
              <h6 className="text-muted">{user.username}</h6>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="ml-md-4">
              <form onSubmit={handleSubmit}>
                <div className="row bg-white">
                  <div className="col-12">
                    <h6 className="my-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="first_name" className="control-label">First Name</label>
                      <input name="first_name" id="first_name" className="form-control"
                        value={fields.first_name} onChange={handleInputChange} />
                      {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="last_name" className="control-label">Last Name</label>
                      <input name="last_name" id="last_name" className="form-control"
                        value={fields.last_name} onChange={handleInputChange} />
                      {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group text-md-right">
                      <Link className="btn btn-secondary mr-5" to="/">Cancel</Link>
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
