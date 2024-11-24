import React, { FormEvent, useState } from "react";
import styles from "../login/login.module.css";
import { useAuthStore } from "../../store/useAuthStore";

export const Register = () => {
  const [imageName, setImageName] = useState<string>("");
  const {signup} = useAuthStore()
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var email = e.currentTarget["email"].value;
    var value = e.currentTarget["password"].value;
    var displayName = e.currentTarget["fullName"].value;
    var profileImg = e.currentTarget.files?.[0];
    signup(email, value, displayName, profileImg ?? "");
  };

  const getProfileImageText = () => {
    return (
      <>
        {imageName === "" ? <p>Select a profile image</p> : <p>{imageName}</p>}
      </>
    );
  };

  return (
    <div className={styles.formRoot}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContents}>
            <div className={styles.formContentsInputWrapper}>
              <label>Email</label>
              <input
                className={styles.formContentsInput}
                type="text"
                name="email"
                title="Email"
                placeholder="Type email"
                autoComplete="on"
              />
            </div>
            <div className={styles.formContentsInputWrapper}>
              <label>Password</label>
              <input
                className={styles.formContentsInput}
                type="password"
                name="password"
                title="Password"
                placeholder="Type password"
                autoComplete="on"
              />
            </div>
            <div className={styles.formContentsInputWrapper}>
              <label>Full Name</label>
              <input
                className={styles.formContentsInput}
                type="text"
                name="fullName"
                title="Full Name"
                placeholder="Type display name"
              />
            </div>
            <div
              className={`${styles.formContentsInputWrapper} ${styles.imageInputWrapper}`}
            >
              <img
                className={styles.imageIcon}
                src="image-icon.gif"
                alt="Image Icon GIF"
              />
              <>{getProfileImageText()}</>
              <input
                className={styles.imageInput}
                type="file"
                name="image"
                alt="Input profile image"
                accept="image/png, image/jpeg, image/jpg"
                title="Image input"
                onChange={(e) => {
                  setImageName(e.currentTarget.files?.[0].name ?? "");
                }}
              />
            </div>
            <div className={styles.formContentsInputWrapper}>
              <input
                className={styles.formContentsInput}
                type="submit"
                name="submit"
                title="Register"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
