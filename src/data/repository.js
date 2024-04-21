const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      username: "mbolger",
      password: "abc123"
    },
    {
      username: "shekhar",
      password: "def456"
    }
  ];

  // Set data into local storage.
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

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function registerUser(username, password) {
  const users = getUsers();

  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return false; // Username already exists
  }

  // Create a new user object
  const newUser = {
    username,
    password // Note: In a real application, passwords should be hashed before storing
  };

  // Push the new user to the array
  users.push(newUser);
  
  // Update data in local storage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return true; // Registration successful
}

export {
  initUsers,
  registerUser,
  verifyUser,
  getUser,
  removeUser
}
