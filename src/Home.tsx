import React from "react";
import styles from "./Home.module.css";
import FriendConversation from "./FriendConversation";

// Navigation with app name and logo
// Root wrapper this should be like the center aligned
// similar to the login/register but bigger
// Left section and right section
// Left section:
// 1. top with profile image and name
// 2. Search bar for searching users
// 3. List of friends
// a. Profile image
// b. Display name
// c. Last message in conversation
// Right section
// 1. top section with Profile image and display name and online icon
// 2. Bottom is the chat section
//   a.. conversation from both end as left right
//   b.. type input and send

export const Home = () => {
  return (
    <>
      <nav className={styles.navigation}>
        <img
          src="favicon-32x32.png"
          alt="Convo Icon"
          className={styles.chatAppIcon}
        />
        <div className={styles.chatAppName}>Convo</div>
      </nav>
      <div className={styles.appSectionRoot}>
        <div className={styles.appSection}>
          <div className={styles.leftSection}>
            <div className={styles.profileHeader}>
              <div className={styles.settingsWrapper}>
                <img
                  src="favicon-32x32.png"
                  alt="Profile Image"
                  className={styles.profileImage}
                />
                <span className={styles.displayName}>Anuj Upadhyaya</span>
                <img
                  src="logout.png"
                  alt="Logout icon"
                  className={styles.logoutImage}
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <input type="text" className={styles.searchBar} />
            <div className={styles.friendsList}>
                <FriendConversation />
            </div>
          </div>
          <div className={styles.rightSection}></div>
        </div>
      </div>
    </>
  );
};
