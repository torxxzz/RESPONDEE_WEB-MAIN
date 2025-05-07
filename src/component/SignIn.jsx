import React from "react";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      {/* Left Side - Image Section */}
      <div className={styles.imageSection}>
        <img src= "https://radyopilipinas.ph/wp-content/uploads/2023/07/logo-CALOOCAN-1536x864.png"
         alt="Welcome" className={styles.image} />
      </div>

      {/* Right Side - Sign-in Box */}
      <div className={styles.signInBox}>
        <h1 className={styles.logo}>LOGO</h1>
        <h2 className={styles.title}>Welcome to Respondee</h2>
        <p className={styles.subtitle}>Sign in to continue.</p>

        <input className={styles.input} type="text" placeholder="Username" />
        <input className={styles.input} type="password" placeholder="Password" />

        <button className={styles.signInButton}>SIGN IN</button>

        <div className={styles.options}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" className={styles.checkbox} />
            Keep me signed in
          </label>
          <a href="#" className={styles.forgotPassword}>Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
