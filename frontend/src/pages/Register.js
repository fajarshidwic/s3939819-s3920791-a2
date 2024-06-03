// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { registerUser } from "../data/repository";

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { findUser, createUser } from "../data/repository";

// function Register(props) {
//   const [fields, setFields] = useState({ username: "", email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFields({ ...fields, [name]: value });
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validate form fields (e.g., check for empty fields)

//     const registered = registerUser(fields.username, fields.email, fields.password);

//     if (registered) {
//       // Redirect to login page or show a success message
//       navigate("/Login");
//     } else {
//       setErrorMessage("Registration failed. Please try again.");
//     }
//   }

//   const handleLoginClick = () => {
//     navigate("/Login"); // Redirect to the login route
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <hr />
//       <div className="row">
//         <div className="col-md-6">
// 			<form onSubmit={handleSubmit}>
// 				<div className="form-group">
// 				<label htmlFor="username" className="control-label">Username</label>
// 				<input name="username" id="username" className="form-control"
// 					value={fields.username} onChange={handleInputChange} />
// 				</div>
// 				<div className="form-group">
// 				<label htmlFor="email" className="control-label">Email</label>
// 				<input name="email" id="email" className="form-control"
// 					value={fields.email} onChange={handleInputChange} />
// 				</div>
// 				<div className="form-group">
// 				<label htmlFor="password" className="control-label">Password</label>
// 				<input type="password" name="password" id="password" className="form-control"
// 					value={fields.password} onChange={handleInputChange} />
// 				</div>
// 				<div className="form-group">
// 				<input type="submit" className="btn btn-primary" value="Register" />
// 				</div>
// 				{errorMessage && <div className="form-group">
// 				<span className="text-danger">{errorMessage}</span>
// 				</div>}
// 			</form>
// 			<p>Already have an account? <button className="btn btn-link" onClick={handleLoginClick}>Login</button></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { findUser, createUser } from "../data/repository";

export default function Register(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "",  password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({ });

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // Create user.
    const user = await createUser(trimmedFields);

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    navigate("/");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "username";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
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
              {errors.username &&
                <div className="text-danger">{errors.username}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">First name</label>
              <input name="firstname" id="firstname" className="form-control"
                value={fields.firstname} onChange={handleInputChange} />
              {errors.firstname &&
                <div className="text-danger">{errors.firstname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="control-label">Last name</label>
              <input name="lastname" id="firstname" className="form-control"
                value={fields.lastname} onChange={handleInputChange} />
              {errors.lastname &&
                <div className="text-danger">{errors.lastname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password <small className="text-muted">must be at least 6 characters</small>
              </label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
              {errors.password &&
                <div className="text-danger">{errors.password}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} />
              {errors.confirmPassword &&
                <div className="text-danger">{errors.confirmPassword}</div>
              }
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary mr-5" value="Register" />
              <Link className="btn btn-outline-dark" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
