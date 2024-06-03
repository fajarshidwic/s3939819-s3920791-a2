import React from "react";
import { getUserObject, removeUser } from "../data/repository";

function MyProfile(props) {
  const user = getUserObject();

  const handleDeleteProfile = async () => {
    try {
      // removeUser();
      console.log("User profile deleted successfully");
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  return (
    <body>
      <div class="container container-fluid">
        <h1 className="display-4">My Profile</h1>
        <div class="row justify-content-around mt-5 user-info">
          {props.user && (
            <><div class="col-12 col-md-3">
              <figure class='avatar avatar-profile'>
                <img class="rounded-circle img-fluid" src={process.env.PUBLIC_URL + 'logo512.png'} alt="Logo" />
              </figure>
              <a href="/profile-management" id="edit_profile" class="btn btn-primary btn-block my-5">
                Edit Profile
              </a>
              <a href="login" onClick={handleDeleteProfile} id="delete_profile" class="btn btn-secondary btn-block my-5">
                Delete Profile
              </a>
            </div>

            <div class="col-12 col-md-5">
                 <h4>Username</h4>
                 <p>{props.user.username}</p>
     
                 <h4>Email Address</h4>
                 <p>{props.user.email}</p>

                 <h4>Date of Joining</h4>
                 <p>{props.user.createdAt}</p>
            </div></>
          )}
        </div>
      </div>
    </body>
  );
}

export default MyProfile;
