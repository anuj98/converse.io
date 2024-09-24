import { useState } from "react"
import styles from "./search.module.css"

export default function Search() {
    const [searchValue, setSearchValue] = useState<string>();

    const allUsers = [{
        id: "123",
        displayName: "Shyam Patel",
        profileImage: "favicon-32x32.png",
    },
    {
        id: "345",
        displayName: "Sai Kumar",
        profileImage: "favicon-32x32.png",
    }]

    const findUsersByDisplayName = () => {
        if (searchValue) {
            const users = allUsers.filter(user => user.displayName.toLowerCase().includes(searchValue.toLowerCase()));
            return users.map(user => {
                return (
                    <div
                        key={`search_${user.id}`}
                        className={styles.userName}>
                        <span><img alt={user.displayName} className={styles.profileImage} src={user.profileImage}/></span>
                        <span>{user.displayName}</span>
                    </div>
                );
            });
        }
        return <></>;
    }

    return (
        <>
            <input
                type="text"
                className={styles.searchBar}
                placeholder="Search friend"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
            <div
                className={
                    `${styles.searchSuggestions} ${searchValue === undefined || searchValue === "" ? styles.hidden : ""}`
                }>
                {findUsersByDisplayName()}
            </div>
        </>
    )
}
