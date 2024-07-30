import React, { Fragment } from "react";
import UserInfoElement from "./UserInfoElement";
import * as styles from "../css/components/UserInfoContainer.css";

function UserInfoContainer({
  FirstTopic,
  FirstText,
  SecoundTopic,
  SecondText,
}) {
  return (
    <Fragment>
      <div className={styles.userInfoContainer}>
        <div
          className={`${styles.firstItem} ${
            FirstTopic === "취미" ? styles.hobby : ""
          }`}
        >
          <UserInfoElement Topic={FirstTopic} Text={FirstText} />
        </div>
        <div className={styles.secondItem}>
          <UserInfoElement Topic={SecoundTopic} Text={SecondText} />
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoContainer;
