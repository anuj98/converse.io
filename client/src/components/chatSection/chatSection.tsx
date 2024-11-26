import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useMessageStore } from "../../store/useMessageStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./chatSection.module.css";

export default function ChatSection() {
  const {
    selectedGroup,
    groupConversation,
    getGroupMessages: getMessagesForSingleFriend,
    sendMessage,
    subscribe,
    unsubscribe,
  } = useMessageStore();
  const { allUsers } = useUserStore();
  const { authUser } = useAuthStore();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedGroup) getMessagesForSingleFriend(selectedGroup);

    subscribe();
    return () => unsubscribe();
  }, [
    selectedGroup,
    groupConversation,
    getMessagesForSingleFriend,
    sendMessage,
    subscribe,
    unsubscribe,
  ]);

  useEffect(() => {
    if (messageRef.current && groupConversation) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [groupConversation]);

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
          ref={messageRef}
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
      sendMessage(friend.id, message);
      setMessage("");
    }
  };

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
