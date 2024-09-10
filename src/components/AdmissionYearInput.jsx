import React, { Fragment } from "react";
import MyInput from "./MyInput";
import * as styles from "../css/components/AgeInput.css";

function AdmissionYearInput({ value, onChange }) {
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        // Validate that the admission year is between 2015 and 2024
        if (!/^(1[5-9]|2[0-4])$/.test(value)) {
        errorMessage = "입학년도는 15부터 24까지의 숫자로 입력하세요.";
        onChange({ target: { name, value: "" } });
        }

        // Show an alert if there is an error
        if (errorMessage) {
        alert(errorMessage);
        }
    };

    return (
        <Fragment>
        <h3 className={styles.agetitle}>입학년도</h3>
        <div className={styles.age}>
            <MyInput
            name="admissionYear"
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder="20"
            className={styles.input}
            />
        </div>
        </Fragment>
    );
}

export default AdmissionYearInput;
