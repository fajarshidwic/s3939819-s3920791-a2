const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null) return;

  const users = [];
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
  const users = getUsers();
  for(const user of users) {
    if(username === user.username && password === user.password)
    {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function getUserObject() {
  const username = localStorage.getItem(USER_KEY);
  const users = getUsers();
  return users.find(user => user.username === username) || {};
}

function removeUser() {
  // Retrieve the users array from local storage
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // Retrieve the username of the user to remove
  const usernameToRemove = localStorage.getItem(USER_KEY);

  // Find the index of the user to remove in the users array
  const userIndex = users.findIndex((user) => user.username === usernameToRemove);

  // If the user is found, remove it from the users array
  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    // Update the local storage with the modified users array
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  localStorage.removeItem(USER_KEY);
}

function registerUser(username, email, password) {
  const users = getUsers();
  const existingUser = users.find(user => user.username === username);
  
  if (existingUser) {
    return false; // User already exists
  } else {
    const newUser = { 
      username,
      email,
      password,
      createdAt: new Date().toISOString(), // Set createdAt to current date and time
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true; // Registration successful
  }
}

// Function to update user's username
function updateUsername(username, newUsername) {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    users[userIndex].username = newUsername;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

// Function to update user's email
function updateEmail(email, newEmail) {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].email = newEmail;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

// Function to update user's password
function updatePassword(password, newPassword) {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.password === password);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

export {
  initUsers,
  registerUser,
  verifyUser,
  setUser,
  getUser,
  getUserObject,
  removeUser,
  updateUsername, 
  updateEmail, 
  updatePassword
}
