import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { getUser, removeUser } from "./data/repository";
import Footer from "./fragments/Footer";
import Navbar from "./fragments/Navbar";
import About from "./pages/About";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyProfileManagement from "./pages/MyProfileManagement";
import Register from "./pages/Register";
import Shop from "./pages/Shop";


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
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
