import { useAuthStore } from "../../store/useAuthStore";
import { useMessageStore } from "../../store/useMessageStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./friendConversation.module.css";

export default function FriendConversation() {
  const { groups: messages, setSelectedGroup } = useMessageStore();
  const { authUser } = useAuthStore();
  const { allUsers } = useUserStore();

  const getFriendsConversationList = () => {
    const friendsList = messages
      .map((message) => {
        const userId =
          message.senderId === authUser?.id
            ? message.recieverId
            : message.senderId;
        const userDetails = allUsers?.filter((user) => user.id === userId)[0];
        if (userDetails) {
          return {
            id: userDetails.id,
            fullName: userDetails.fullName,
            lastText: message.text,
            profilePic:
              userDetails.profilePic.length > 0
                ? userDetails.profilePic
                : "favicon-32x32.png",
          };
        }
      })
      .filter((friend) => friend !== undefined);

    const handleGroupSelect = (userId: string) => {
      setSelectedGroup(userId);
    };

    return friendsList.map((friend) => {
      return (
        <div
          key={friend?.id}
          className={styles.friendConvoPreviewWrapper}
          onClick={() => handleGroupSelect(friend?.id ? friend.id : "")}
        >
          <img
            src={friend?.profilePic}
            alt={`${friend?.fullName} profile`}
            className={styles.profileImage}
          />
          <div>
            <div>{friend?.fullName}</div>
            <div className={styles.textMessage}>{friend?.lastText}</div>
          </div>
        </div>
      );
    });
  };

  return <>{getFriendsConversationList()}</>;
}
