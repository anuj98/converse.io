import styles from "./FriendConversation.module.css";

export default function FriendConversation() {
  const friendsList = [
    {
      profileImage: "favicon-32x32.png",
      displayName: "Shyam Kasturi",
      lastText: "I know wtf are they doing",
      id: "123",
    },
    {
      profileImage: "favicon-32x32.png",
      displayName: "Sai Kumar",
      lastText: "For sure Hyd's gonna win",
      id: "345",
    },
    {
      profileImage: "favicon-32x32.png",
      displayName: "Tanay Jain",
      lastText: "I completed the work assinged and will be posting the PR",
      id: "678",
    },
  ];

  const getFriendsConversationList = () => {
    return friendsList.map((friend) => {
      return (
        <div key={friend.id} className={styles.friendConvoPreviewWrapper}>
          <img
            src={friend.profileImage}
            alt={`${friend.displayName} profile`}
            className={styles.profileImage}
          />
          <div>
            <div>{friend.displayName}</div>
            <div className={styles.textMessage}>{friend.lastText}</div>
          </div>
        </div>
      );
    });
  };

  return <>{getFriendsConversationList()}</>;
}
