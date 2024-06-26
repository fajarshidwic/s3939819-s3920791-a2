import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";

function Login(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, password: fields.password };
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    navigate("/");
  };

  const handleRegisterClick = () => {
    navigate("/Register"); // Redirect to the register route
  };

  return (
    <div>
      <h1>Login</h1>
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
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handleRegisterClick}>Register</button>
              </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { verifyUser } from "../data/repository";

// export default function Login(props) {
//   const navigate = useNavigate();
//   const [fields, setFields] = useState({ username: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState(null);

//   // Generic change handler.
//   const handleInputChange = (event) => {
//     setFields({ ...fields, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const user = await verifyUser(fields.username, fields.password);

//     if(user === null) {
//       // Login failed, reset password field to blank and set error message.
//       setFields({ ...fields, password: "" });
//       setErrorMessage("Username and / or password invalid, please try again.");
//       return;
//     }

//     // Set user state.
//     props.loginUser(user);

//     // Navigate to the home page.
//     navigate("/");
//   };

//   const handleRegisterClick = () => {
//         navigate("/Register"); // Redirect to the register route
//       };

//   return (
//     <div>
//       <h1>Login</h1>
//       <hr />
//       <div className="row">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username" className="control-label">Username</label>
//               <input name="username" id="username" className="form-control"
//                 value={fields.username} onChange={handleInputChange} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password" className="control-label">Password</label>
//               <input type="password" name="password" id="password" className="form-control"
//                 value={fields.password} onChange={handleInputChange} />
//             </div>
//             <div className="form-group">
//               <input type="submit" className="btn btn-primary" value="Login" />
//               <button type="button" className="btn btn-secondary ml-2" onClick={handleRegisterClick}>Register</button>
//             </div>
//             {errorMessage !== null &&
//               <div className="form-group">
//                 <span className="text-danger">{errorMessage}</span>
//               </div>
//             }
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
