import React from "react";
import styles from "./Home.module.css";
import FriendConversation from "./FriendConversation";
import ChatSection from "./ChatSection";
import Search from "./search";

export const Home = () => {
  return (
    <>
      <nav className={styles.navigation}>
        <img
          src="favicon-32x32.png"
          alt="Convo Icon"
          className={styles.chatAppIcon}
        />
        <div className={styles.chatAppName}>Converse.io</div>
      </nav>
      <div className={styles.appSectionRoot}>
        <div className={styles.appSection}>
          <div className={styles.leftSection}>
            <div className={styles.profileHeader}>
              <div className={styles.settingsWrapper}>
                <img
                  src="favicon-32x32.png"
                  alt="Profile"
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
            <Search />
            <div className={styles.friendsList}>
                <FriendConversation />
            </div>
          </div>
          <div className={styles.rightSection}>
            <ChatSection />
          </div>
        </div>
      </div>
    </>
  );
};
