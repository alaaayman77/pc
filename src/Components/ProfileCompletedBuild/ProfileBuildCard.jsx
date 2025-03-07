import React from "react";
import Logo from "../../assets/images/logo.svg";
import BuildDummy from "../../assets/images/build_dummy.svg";
import "./ProfileBuildCard.css";

function ProfileBuildCard() {
  return (
    <div className="profile_buildCard">
      <div className="profile_buildCard_main">
        <div className="profile_buildCard_info">
          <img src={BuildDummy} width={120} />
          <h3 className="profile_buildCard_title">Victory Vault</h3>{" "}
        </div>
        <div className="profile_buildCard_buttons">
          <button className="profile_buildCard_Edit">Edit</button>
          <button className="profile_buildCard_Share">Share</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBuildCard;
