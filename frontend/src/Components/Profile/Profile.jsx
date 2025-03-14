import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Collapse, Avatar } from "antd";
import { MdAddCircle } from "react-icons/md";
import "./Profile.css";
import NewFolderPopUp from "../NewFolderPopUp/NewFolderPopUp";
import ProfileBuildCard from "../ProfileBuildCard/ProfileBuildCard";

import TabContent from "../ProfileTabContent/ProfileTabContent";
import EditProfilePopUp from "../EditProfilePopUp/EditProfilePopUp";
import { UserOutlined } from "@ant-design/icons";
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract tab from URL or default to "1"
  const queryParams = new URLSearchParams(location.search);
  // Search for a certain query parameter (I need tab in my case)
  const initialTab = queryParams.get("tab") || "1";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userBio, setUserBio] = useState("Available");
  const [userName, setUserName] = useState("User Name");
  const [folders, setFolders] = useState({
    1: [
      {
        name: "Gaming",
        profileBuilds: [{ id: 1, title: "High-End Gaming PC" }],
      },
      {
        name: "Streaming Rig",
        profileBuilds: [{ id: 2, title: "Streaming Beast" }],
      },
    ],
    2: [
      {
        name: "Workstation Build",
        profileBuilds: [{ id: 3, title: "Video Editing Setup" }],
      },
      {
        name: "Budget Gaming",
        profileBuilds: [{ id: 4, title: "Affordable Gaming" }],
      },
    ],
    3: [
      { name: "CPUs", profileBuilds: [] },
      { name: "GPUs", profileBuilds: [] },
      { name: "Motherboards", profileBuilds: [] },
      { name: "RAM", profileBuilds: [] },
      { name: "Cases", profileBuilds: [] },
      { name: "Storage", profileBuilds: [] },
      { name: "Cooling", profileBuilds: [] },
      { name: "Power Supply", profileBuilds: [] },
    ],
  });

  //Updates UI if i changed query parameter manually
  useEffect(() => {
    // Sync state with URL changes (useful if the user manually updates the URL)
    setActiveTab(queryParams.get("tab") || "1");
  }, [location.search]);

  const handleDeleteFolder = (folderIndex) => {
    setFolders((prev) => {
      const updatedFolders = {
        ...prev,
        [activeTab]: prev[activeTab].filter(
          (_, index) => index !== folderIndex
        ),
      };
      return updatedFolders;
    });
  };

  const handleSaveFolder = (folderName) => {
    if (!folderName.trim()) return;
    setFolders((prev) => ({
      ...prev,
      [activeTab]: [
        ...(prev[activeTab] ?? []),
        { name: folderName, profileBuilds: [] }, // ✅ Store as an object
      ],
    }));
    setTimeout(() => setOpenPopUp(false), 0);
  };

  return (
    <div className="profile_main">
      <div className="profile_primary">
        <div className="profile_image">
          {imageUrl ? (
            <img src={imageUrl} size={100} />
          ) : (
            <UserOutlined className="default-avatar-icon" />
          )}
        </div>
        <div className="profile_userDetails">
          <div className="profie_user_info">
            <p className="profile_username"> {userName} </p>
            <p className="profile_followerCount">
              180 <span style={{ color: "#7d7e80" }}>followers</span>
            </p>
          </div>
        </div>
        <div className="profile_userBio">{userBio ? <p>{userBio}</p> : ""}</div>
        <div className="profile_editbtn">
          <button onClick={() => setOpenEditProfilePopUp(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile_secondary">
        <Tabs
          centered
          activeKey={activeTab} // Ensure active tab state is in sync
          onChange={(key) => {
            setActiveTab(key);
            navigate(`?tab=${key}`, { replace: true }); // Update URL without adding to history
          }}
          items={[
            {
              label: "Completed Builds",
              key: "1",
              children: (
                <TabContent
                  tabKey="1"
                  folders={folders}
                  setFolders={setFolders}
                  handleDeleteFolder={handleDeleteFolder}
                  setOpenPopUp={setOpenPopUp}
                />
              ),
            },
            {
              label: "Saved Builds",
              key: "2",
              children: (
                <TabContent
                  tabKey="2"
                  folders={folders}
                  setFolders={setFolders}
                  handleDeleteFolder={handleDeleteFolder}
                  setOpenPopUp={setOpenPopUp}
                />
              ),
            },
            {
              label: "Saved Components",
              key: "3",
              children: (
                <TabContent
                  tabKey="3"
                  folders={folders}
                  setFolders={setFolders}
                  handleDeleteFolder={handleDeleteFolder}
                  setOpenPopUp={setOpenPopUp}
                />
              ),
            },
          ]}
        />
      </div>

      {/* Render PopUp Conditionally */}
      {openPopUp && (
        <NewFolderPopUp
          setOpenPopUp={setOpenPopUp}
          handleSaveFolder={handleSaveFolder}
        />
      )}
      {/* Render Edit ProfilePopUp Conditionally */}
      {openEditProfilePopUp && (
        <EditProfilePopUp
          setOpenEditProfilePopUp={setOpenEditProfilePopUp}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setUserBio={setUserBio}
          userBio={userBio}
          setUserName={setUserName}
          userName={userName}
        />
      )}
    </div>
  );
}

export default Profile;
