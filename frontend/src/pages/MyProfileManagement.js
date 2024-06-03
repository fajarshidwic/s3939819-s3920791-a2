import React, { useState } from "react";
import { updateUsername, updateEmail, updatePassword } from "../data/repository";

function ProfileManagement() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateUsername = () => {
    const success = updateUsername(currentUsername, newUsername);
    setMessage(success ? "Username updated successfully." : "Failed to update username.");
  };

  const handleUpdateEmail = () => {
    const success = updateEmail(currentEmail, newEmail);
    setMessage(success ? "Email updated successfully." : "Failed to update email.");
  };

  const handleChangePassword = () => {
    const success = updatePassword(currentPassword, newPassword);
    setMessage(success ? "Password changed successfully." : "Failed to change password.");
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Profile Management</h2>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Update Username</h4>
          <div className="form-group">
            <input type="text" className="form-control" value={currentUsername} onChange={(e) => setCurrentUsername(e.target.value)} placeholder="Current Username" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New Username" />
          </div>
          <button className="btn btn-primary" onClick={handleUpdateUsername}>Update Username</button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Update Email</h4>
          <div className="form-group">
            <input type="text" className="form-control" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} placeholder="Current Email" />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" />
          </div>
          <button className="btn btn-primary" onClick={handleUpdateEmail}>Update Email</button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Change Password</h4>
          <div className="form-group">
            <input type="text" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
          </div>
          <button className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>

      {message && <div className="alert mt-4 alert-info">{message}</div>}
    </div>
  );
}

export default ProfileManagement;