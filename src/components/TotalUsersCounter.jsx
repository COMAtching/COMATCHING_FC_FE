import React, { Fragment } from "react";
import * as styles from "../css/components/TotalUsersCounter.css.ts";

// 유저가 몇명인지 보여주기 위한 컴포넌트입니다.
function TotalUsersCounter({ font_size, color, pointcolor, numParticipants }) {
  // 페이지마다 fontsize가 달라서 사이즈를 불러오는 형식으로 진행하였습니다.
  return (
    <Fragment>
      <div
        className={styles.totalUsersCounter}
        style={{ fontSize: font_size, color: pointcolor }}
      >
        현재{" "}
        <span
          className={styles.totalUsersCounter_span}
          style={{ color: color }}
        >
          {numParticipants}명
        </span>{" "}
        참여중이에요!
      </div>
    </Fragment>
  );
}

export default TotalUsersCounter;
