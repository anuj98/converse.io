import React, { FormEvent } from "react";
import styles from "./Login.module.css";

export const Login = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var email = e.currentTarget["email"].value;
    var value = e.currentTarget["password"].value;
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
              <input
                className={styles.formContentsInput}
                type="submit"
                name="submit"
                title="Login"
                value="Login"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
