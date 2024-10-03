import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";

function HeaderMain() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div>
        <object
          className={styles.logoImg}
          data={`${import.meta.env.VITE_PUBLIC_URL}../../assets/logoblacknav.svg`}
          type="image/svg+xml"
          aria-label="로고"
          onClick={() => navigate("/")}
        >
          <span>로고</span>
        </object>
      </div>
    </div>
  );
}

export default HeaderMain;
