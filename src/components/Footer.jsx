import React from "react";
import * as styles from "../css/components/Footer.css.ts";

function Footer() {
  return (
    <div className={styles.footer}>
      Development by CUK COMA, Concept by Astroke
      <img
        className={styles.maker}
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/maker.svg`}
        alt="메이커"
      />
    </div>
  );
}

export default Footer;
