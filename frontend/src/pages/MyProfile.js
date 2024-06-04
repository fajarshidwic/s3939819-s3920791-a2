import React from "react";
import { Link } from "react-router-dom";
import { getUserObject } from "../data/repository";

function MyProfile(props) {
  const user = getUserObject();

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
              <Link className="btn btn-primary" to={`/profile-management/${props.user.username}`}>Edit Profile</Link>
            </div>

            <div class="col-12 col-md-5">
                 <h4>Username</h4>
                 <p>{props.user.username}</p>
            </div></>
          )}
        </div>
      </div>
    </body>
  );
}

export default MyProfile;
