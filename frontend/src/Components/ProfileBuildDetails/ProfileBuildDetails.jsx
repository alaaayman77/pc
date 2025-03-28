import React from "react";
import ProfileBuildDescription from "../EditableTextField/EditableTextField";
import { Divider } from "antd";
import EditableTextField from "../EditableTextField/EditableTextField";
import dummyImage from "../../assets/images/build_dummy.svg";
import { FiRefreshCw } from "react-icons/fi";
import "./ProfileBuildDetails.css";

function ProfileBuildDetails({ title, setTitle, onDeleteBuild }) {
  return (
    <div className="profile_buildDetails">
      <div className="profile_buildDetails_main">
        <div className="profile_buildDetails-title">
          <EditableTextField
            value={title}
            setValue={setTitle}
            placeholder="Build Title..."
            width={300}
            fontWeight="500"
            fontSize="16px"
          />
        </div>
        <div className="profile_buildDetails-image">
          <img src={dummyImage} />
        </div>
        <div className="profile_buildDetails-desc">
          <EditableTextField
            placeholder="Build Description..."
            width={300}
            fontWeight="300"
            fontSize="12px"
          />
        </div>
      </div>
      <div className="profile_buildDetails_secondary">
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">CPU</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">GPU</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Motherboard</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Case</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Cooling</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Memory</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Storage</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_Component">
          <p className="profile_buildDetails_Component-type">Power Supply</p>
          <img src={dummyImage} />
          <p className="profile_buildDetails_Component-title">
            AMD Ryzen 5 5500
          </p>
          <button>
            <FiRefreshCw />
          </button>
        </div>
        <div className="divider"></div>
        <div className="profile_buildDetails_buttons">
          <button className="buildDetails_delete_btn" onClick={onDeleteBuild}>
            Delete Build
          </button>
          <button className="buildDetails_save_btn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBuildDetails;
