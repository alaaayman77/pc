import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Tabs, Collapse } from "antd";
import { MdAddCircle } from "react-icons/md";
import "./Profile.css";
import NewFolderPopUp from "../NewFolderPopUp/NewFolderPopUp";
import ProfileBuildCard from "../ProfileCompletedBuild/ProfileBuildCard";

function Profile() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [activeTab, setActiveTab] = useState("1"); // Track the active tab
  const [folders, setFolders] = useState({
    1: ["Gaming", "Streaming Rig"], // Completed Builds
    2: ["Workstation Build", "Budget Gaming"], // Saved Builds
    3: [
      "CPUs",
      "GPUs",
      "Motherboards",
      "RAM",
      "Cases",
      "Storage",
      "Cooling",
      "Power Supply",
    ], // Saved Components
  });

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

    setFolders((prev) => {
      const updatedFolders = {
        ...prev,
        [activeTab]: [...(prev[activeTab] ?? []), folderName],
      };

      console.log("Updated Folders State:", updatedFolders); // Debugging

      return { ...updatedFolders };
    });

    setTimeout(() => setOpenPopUp(false), 0);
  };

  return (
    <div className="profile_main">
      <div className="profile_primary">
        <div className="profile_image">A</div>
        <div className="profile_userDetails">
          <div className="profie_user_info">
            <p className="profile_username">Alaa Ayman</p>
            <p className="profile_followerCount">
              180 <span color="#7d7e80">followers</span>
            </p>
          </div>
        </div>
        <div className="profile_userBio">
          Gamer who likes to stream League of Legends
        </div>
        <div className="profile_editbtn">
          <NavLink>
            <button>Edit Profile</button>
          </NavLink>
        </div>
      </div>

      <div className="profile_secondary">
        <Tabs
          defaultActiveKey="1"
          centered
          activeKey={activeTab} // Ensure active tab state is in sync
          onChange={(key) => setActiveTab(key)} // Update active tab when switching
          items={[
            {
              label: "Completed Builds",
              key: "1",
              children: (
                <div className="profile_folders">
                  <div className="profile_newFolder">
                    <button onClick={() => setOpenPopUp(true)}>
                      <MdAddCircle size={20} />
                      <p>New Folder</p>
                    </button>
                  </div>
                  {/* Ensure Collapse updates instantly */}
                  <Collapse
                    ghost
                    items={
                      folders["1"]?.map((folder, index) => ({
                        key: index.toString(),
                        label: folder,
                        children: (
                          <div className="profile_folderContent">
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <button
                              className="profile_deleteFolderBtn"
                              onClick={() => handleDeleteFolder(index)}
                            >
                              Delete Folder
                            </button>
                          </div>
                        ),
                      })) || []
                    }
                  />
                </div>
              ),
            },
            {
              label: "Saved Builds",
              key: "2",
              children: (
                <div className="profile_folders">
                  <div className="profile_newFolder">
                    <button onClick={() => setOpenPopUp(true)}>
                      <MdAddCircle size={20} />
                      <p>New Folder</p>
                    </button>
                  </div>

                  <Collapse
                    ghost
                    items={
                      folders["2"]?.map((folder, index) => ({
                        key: index.toString(),
                        label: folder,
                        children: (
                          <div className="profile_folderContent">
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <button
                              className="profile_deleteFolderBtn"
                              onClick={() => handleDeleteFolder(index)}
                            >
                              Delete Folder
                            </button>
                          </div>
                        ),
                      })) || []
                    }
                  />
                </div>
              ),
            },
            {
              label: "Saved Components",
              key: "3",
              children: (
                <div className="profile_folders">
                  <div className="profile_newFolder">
                    <button onClick={() => setOpenPopUp(true)}>
                      <MdAddCircle size={20} />
                      <p>New Folder</p>
                    </button>
                  </div>
                  <Collapse
                    ghost
                    items={
                      folders["3"]?.map((folder, index) => ({
                        key: index.toString(),
                        label: folder,
                        children: (
                          <div className="profile_folderContent">
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <ProfileBuildCard />
                            <button
                              className="profile_deleteFolderBtn"
                              onClick={() => handleDeleteFolder(index)}
                            >
                              Delete Folder
                            </button>
                          </div>
                        ),
                      })) || []
                    }
                  />
                </div>
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
    </div>
  );
}

export default Profile;
