import React, { useEffect } from "react";
import styles from "./home.module.css";
import FriendConversation from "../friendConversation/friendConversation";
import Search from "../search/search";
import ChatSection from "../chatSection/chatSection";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import { useMessageStore } from "../../store/useMessageStore";

export const Home = () => {
  const { authUser, logout } = useAuthStore();
  const { getUsers } = useUserStore();
  const { getTopMessages } = useMessageStore();

  useEffect(() => {
    getUsers();
    getTopMessages();
  }, [getUsers, getTopMessages]);

  const handleLogout = () => {
    logout();
  };

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
                <span className={styles.displayName}>{authUser?.fullName}</span>
                <div onClick={async () => await handleLogout()}>
                  <img
                    src="logout.png"
                    alt="Logout icon"
                    className={styles.logoutImage}
                    width={25}
                    height={25}
                  />
                </div>
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
