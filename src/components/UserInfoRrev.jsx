import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import * as styles from "../css/components/UserInfoRrev.css.ts";
import UserInfoContainer from "./UserInfoContainer";
import { useNavigate } from "react-router-dom";
function UserInfoRrev({ ifMainpage }) {
  const navigate = useNavigate();
  const Info = useRecoilValue(userState);
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isInstagram = Info.contact_id && Info.contact_id.startsWith("@");

  const scroll = (pageIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth * pageIndex;
      setCurrentPage(pageIndex);
    }
  };

  return (
    <Fragment>
      
      <div className={styles.userInfoRrev}>
        {currentPage > 0 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
            onClick={() => scroll(currentPage - 1)}
          >
            ◀
          </div>
        )}
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.sliderPage}>
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={Info.major}
              SecoundTopic="나이"
              SecondText={Info.age}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={Info.song}
              SecoundTopic="MBTI"
              SecondText={Info.mbti}
            />
          </div>
          <div className={`${styles.sliderPage} ${styles.sliderPageSecond}`}>
            <UserInfoContainer FirstTopic="취미" FirstText={Info.hobby} />
            <UserInfoContainer
              FirstTopic="나를 표현하는 한마디"
              FirstText={Info.comment}
              SecoundTopic="연락빈도"
              SecondText={Info.contact_frequency}
            />
          </div>
        </div>
        {currentPage < 1 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
            onClick={() => scroll(currentPage + 1)}
          >
            ▶
          </div>
        )}
        <div className={styles.userContact}>
          <div>
            <span>{isInstagram ? "InstagramID : " : "KakaoTalkID : "}</span>
            <span> {Info.contact_id}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
