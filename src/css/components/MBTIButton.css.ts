import { style } from "@vanilla-extract/css";

export const mbtiElement = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "25%",
});

export const mbtiButton = style({
  width: "85%",
  height: "54px",
  margin: "0px 6px 10px 6px",
  
  borderRadius: "30px",
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  fontSize: "20px",
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: "bold",
  color: "#a5a5a5",
});

export const activeButton = style({
  background: 'linear-gradient(45deg, #F8D1E0 0%, #FFFFFF 75%)', // 기존 색상보다 더 연한 핑크
  color: "#F57DB2",
  border: "1px solid #F57DB2", // 2px 두께의 경계선, 색상은 #F57DB2
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: "bold",
  fontSize: "20px",
});


export const formMbtiButton = style({
  width: "90%",
  height: "54px",
  padding:"0px",
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: 700,
  fontSize: "20px",
  margin: "0px 6px 10px 6px",
  borderRadius: "30px",
  backgroundColor: "#ffffff",
  color: "#a5a5a5",
  border: "2px solid #e0e0e0",
});

export const formActiveButton = style({
  background: 'pink', // 기존 색상보다 더 연한 핑크
  opacity: '0.5',
  color: "#ffffff",
  border: "none",
});
