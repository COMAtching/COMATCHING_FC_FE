import React, { Fragment } from "react";
import MyInput from "./MyInput";
import * as styles from "../css/components/AgeInput.css";

function AgeInput({ value, onChange }) {
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // 유효성 검사
    if (!/^(20|21|22|23|24|25|26|27|28|29)$/.test(value)) {
      errorMessage = "나이는 20부터 29까지의 숫자로 입력하세요.";
      onChange({ target: { name, value: "" } });
    }

    // 에러 메시지가 있을 경우에만 경고창을 띄웁니다.
    if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <Fragment>
      <h3 className={styles.agetitle}>나이</h3>
      <div className={styles.age}>
        <MyInput
          name="age"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="23"
          className={styles.input}
        />
      </div>
    </Fragment>
  );
}

export default AgeInput;
