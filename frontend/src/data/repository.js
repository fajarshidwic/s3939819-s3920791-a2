import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";
const USERS_KEY = "users";
// const USER_KEY = "user";

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

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

async function getUserByUsername(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  return response.data;
}

function getUserObject() {
  const username = localStorage.getItem(USER_KEY);
  const users = getUsers();
  return users.find(user => user.username === username) || {};
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}


async function updateUser(user) {
  const response = await axios.put(API_HOST + "/api/users", user);

  return response.data;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

export {
  initUsers,
  verifyUser,
  setUser,
  getUser,
  getUserByUsername,
  getUserObject,
  removeUser,
  updateUser,
  createUser,
  findUser
}

// import axios from "axios";

// // --- Constants ----------------------------------------------------------------------------------
// const API_HOST = "http://localhost:4000";
// const USER_KEY = "user";

// // --- User ---------------------------------------------------------------------------------------
// async function verifyUser(username, password) {
//   const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
//   const user = response.data;
  
//   // NOTE: In this example the login is also persistent as it is stored in local storage.
//   if(user !== null)
//     setUser(user);

//   return user;
// }

// async function findUser(id) {
//   const response = await axios.get(API_HOST + `/api/users/select/${id}`);

//   return response.data;
// }

// async function createUser(user) {
//   const response = await axios.post(API_HOST + "/api/users", user);

//   return response.data;
// }

// // // --- Post ---------------------------------------------------------------------------------------
// // async function getPosts() {
// //   const response = await axios.get(API_HOST + "/api/posts");

// //   return response.data;
// // }

// // async function createPost(post) {
// //   const response = await axios.post(API_HOST + "/api/posts", post);

// //   return response.data;
// // }

// // --- Helper functions to interact with local storage --------------------------------------------
// function setUser(user) {
//   localStorage.setItem(USER_KEY, JSON.stringify(user));
// }

// function getUser() {
//   return JSON.parse(localStorage.getItem(USER_KEY));
// }

// function removeUser() {
//   localStorage.removeItem(USER_KEY);
// }

// export {
//   verifyUser, findUser, createUser,
//   // getPosts, createPost,
//   getUser, removeUser
// }
