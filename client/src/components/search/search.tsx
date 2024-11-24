import { useEffect, useState } from "react";
import styles from "./search.module.css";
import { useAuthStore } from "../../store/useAuthStore";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>();
  const { allUsers } = useAuthStore();

  const findUsersByDisplayName = () => {
    if (searchValue) {
      console.log(allUsers);
      const users = allUsers?.filter((user) =>
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log("filtered", users);
      return users?.map((user) => {
        return (
          <div key={`search_${user.id}`} className={styles.userName}>
            <span>
              <img
                alt={user.fullName}
                className={styles.profileImage}
                src={
                  user.profilePic.length > 0
                    ? user.profilePic
                    : "favicon-32x32.png"
                }
              />
            </span>
            <span>{user.fullName}</span>
          </div>
        );
      });
    }
    return <></>;
  };

  return (
    <>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search friend"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div
        className={`${styles.searchSuggestions} ${
          searchValue === undefined || searchValue === "" ? styles.hidden : ""
        }`}
      >
        {findUsersByDisplayName()}
      </div>
    </>
  );
}