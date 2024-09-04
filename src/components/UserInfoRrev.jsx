import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "./LoginUserInfoTop";
import * as styles from "../css/components/UserInfoRrev.css.ts";
import UserInfoContainer from "./UserInfoContainer";
import { useNavigate } from "react-router-dom";
function UserInfoRrev({ user, ifMainpage }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isInstagram = user.contact_id && user.contact_id.startsWith('@');

  const scroll = (pageIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth * pageIndex;
      setCurrentPage(pageIndex);
    }
  };

  return (
    <Fragment>
      {ifMainpage && <LoginUserInfoTop username={user.username} />}
      <div className={styles.userInfoRrev}>
        {/* {currentPage > 0 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
            onClick={() => scroll(currentPage - 1)}
          >
            ◀
          </div>
        )} */}
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.sliderPage}>
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={user.major}
              SecoundTopic="나이"
              SecondText={user.age}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={user.song}
              SecoundTopic="MBTI"
              SecondText={user.mbti}
            />
          </div>
          {/* <div className={`${styles.sliderPage} ${styles.sliderPageSecond}`}>
            <UserInfoContainer FirstTopic="취미" FirstText={user.hobby} />
            <UserInfoContainer
              FirstTopic="나를 표현하는 한마디"
              FirstText={user.comment}
              SecoundTopic="연락빈도"
              SecondText={user.contact_frequency}
            />
          </div> */}
        </div>
        {/* {currentPage < 1 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
            onClick={() => scroll(currentPage + 1)}
          >
            ▶
          </div> */}
        {/* )} */}
        <div className={styles.userContact}>
          <div>
              <span>
                {isInstagram ? 'InstagramID : ' : 'KakaoTalkID : '}
              </span>
              <span> {user.contact_id}</span>
          </div>
          
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
