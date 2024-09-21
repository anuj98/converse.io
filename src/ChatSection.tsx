import styles from "./ChatSection.module.css";

export default function ChatSection() {
    // texts to be sorted based on created date ascending order by date and time
    const texts = [
        {
            message: "Yo whats up",
            createdOn: new Date(),
            updatedOn: "",
            fromId: "000",
            toId: "123"
        },
        {
            message: "I am good how are you",
            createdOn: new Date(),
            updatedOn: "",
            fromId: "123",
            toId: "000"
        },
    ];
    const friend = {
        profileImage: "favicon-32x32.png",
        displayName: "Shyam Kasturi",
        id: "123",
    };
    const loggedInUser = "000";

    const getChats = () => {
        return texts.map((text, index) => {
            return (
                <div key={`${text.fromId}_${text.toId}_${index}`}
                    className={
                        `${styles.chatBubble} ${text.fromId === loggedInUser
                            ? styles.chatBubbleRight
                            : styles.chatBubbleLeft}`
                    }>
                    {text.message}
                    <div className={styles.sentTime}>Sent {text.createdOn.toDateString()} {text.createdOn.toTimeString()}</div>
                </div>
            )
        });
    }

    return (
        <>
            {/* Navigation */}
            <div className={styles.navigation}>
                <img
                    src={friend?.profileImage}
                    alt={`${friend?.displayName} profile`}
                    className={styles.profileImage}
                />
                <div>{friend?.displayName}</div>
            </div>
            {/* Chat Section */}
            <div className={styles.chatSection}>
                <div className={styles.allTexts}>{getChats()}</div>
                <div className={styles.chatInputContainer}>
                    <input type="text" placeholder="Type a message..." className={styles.chatInput} />
                    <button className={styles.sendButton}>
                        <span role="img" aria-label="send">🚀</span>
                    </button>
                </div>
            </div>
        </>
    )
}