import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useMessageStore } from "../../store/useMessageStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./chatSection.module.css";

export default function ChatSection() {
  const { selectedGroup, groupConversation, getMessagesForSingleFriend, sendMessage } = useMessageStore();
  const { allUsers } = useUserStore();
  const { authUser } = useAuthStore();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const friend = allUsers?.find((user) => user.id === selectedGroup);

  const getChats = () => {
    return groupConversation.map((message, index) => {
      return (
        <div
          key={`${message.senderId}_${message.recieverId}_${index}`}
          className={`${styles.chatBubble} ${
            message.senderId === authUser?.id
              ? styles.chatBubbleRight
              : styles.chatBubbleLeft
          }`}
        >
          {message.text}
          <div className={styles.sentTime}>
            Sent {new Date(message.createdAt).toDateString()}{" "}
            {new Date(message.createdAt).toTimeString()}
          </div>
        </div>
      );
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    if (text) {
      setMessage(text);
    }
  };

  const handleSendMessage = () => {
    if (message && message.length && friend) {
      sendMessage(friend.id, message)
      getMessagesForSingleFriend(friend.id)
    }
  }

  return (
    <>
      {/* Navigation */}
      <div className={styles.navigation}>
        <img
          src={
            friend?.profilePic && friend.profilePic.length > 0
              ? friend?.profilePic
              : "favicon-32x32.png"
          }
          alt={`${friend?.fullName} profile`}
          className={styles.profileImage}
        />
        <div>{friend?.fullName}</div>
      </div>
      {/* Chat Section */}
      <div className={styles.chatSection}>
        <div className={styles.allTexts}>{getChats()}</div>
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            className={styles.chatInput}
            value={message}
            onChange={handleTextChange}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            <span role="img" aria-label="send">
              🚀
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
