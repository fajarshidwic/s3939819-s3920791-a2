import React, { useState, useEffect } from "react";
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
import MessageContext from "./contexts/MessageContext";


function App() {
  const [user, setUser] = useState(getUser());
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  const loginUser = (user) => {
    setUser(user);
  }

  const logoutUser = () => {
    removeUser();
    setUser(null);
  }

  return (

    <div className="d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          <Navbar user={user} logoutUser={logoutUser} />
          <main role="main">
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/login" element={<Login loginUser={loginUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<MyProfile user={user} />} />
                <Route path="/profile-management/:username" element={<MyProfileManagement user={user} />} />
                <Route path="/forum" element={<Forum user={user} />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
