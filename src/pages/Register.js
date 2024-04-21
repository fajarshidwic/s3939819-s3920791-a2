import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../data/repository";

function Register(props) {
  const [fields, setFields] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields (e.g., check for empty fields)

    const registered = registerUser(fields.username, fields.email, fields.password);

    if (registered) {
      // Redirect to login page or show a success message
      navigate("/Login");
    } else {
      setErrorMessage("Registration failed. Please try again.");
    }
  }

  const handleLoginClick = () => {
    navigate("/Login"); // Redirect to the login route
  };

  return (
    <div>
      <h1>Register</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
				<label htmlFor="username" className="control-label">Username</label>
				<input name="username" id="username" className="form-control"
					value={fields.username} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				<label htmlFor="email" className="control-label">Email</label>
				<input name="email" id="email" className="form-control"
					value={fields.email} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				<label htmlFor="password" className="control-label">Password</label>
				<input type="password" name="password" id="password" className="form-control"
					value={fields.password} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				<input type="submit" className="btn btn-primary" value="Register" />
				</div>
				{errorMessage && <div className="form-group">
				<span className="text-danger">{errorMessage}</span>
				</div>}
			</form>
			<p>Already have an account? <button className="btn btn-link" onClick={handleLoginClick}>Login</button></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
