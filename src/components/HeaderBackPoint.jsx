import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";

function HeaderBackPoint({ currentPoint }) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
       <div className={styles.left} onClick={() => navigate("/")}>
                <img src="./assets/backimg.svg" alt="point" className={styles.pointImage} />
                <span className={styles.spanText}>돌아가기</span>
                
        </div>
        <div className={styles.right} onClick={() => navigate("/charge-request")}>
                <img src="./assets/point.svg" alt="point" className={styles.pointImage} />
                <span className={styles.spanText}>{ currentPoint }p</span>
                <img src="./assets/headertoggle.svg" alt="toggle" className={styles.toggleImage} />
        </div>
    </div>
  );
}
export default HeaderBackPoint;