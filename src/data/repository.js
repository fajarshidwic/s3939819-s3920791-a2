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

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function registerUser(username, email, password) {
  const users = getUsers();
  const existingUser = users.find(user => user.username === username);
  
  if (existingUser) {
    return false; // User already exists
  } else {
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true; // Registration successful
  }
}

export {
  initUsers,
  registerUser,
  verifyUser,
  getUser,
  removeUser
}
