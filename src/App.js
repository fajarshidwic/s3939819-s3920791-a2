import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import MyProfileManagement from "./pages/MyProfileManagement";
import Forum from "./pages/Forum";
import { getUser, removeUser } from "./data/repository";

function App() {
  const [username, setUsername] = useState(getUser());

  const loginUser = (username) => {
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar username={username} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home username={username} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<MyProfile username={username} />} />
              <Route path="/profile-management" element={<MyProfileManagement />} />
              <Route path="/forum" element={<Forum username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
