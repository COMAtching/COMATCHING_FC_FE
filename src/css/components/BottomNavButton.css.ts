import { style } from "@vanilla-extract/css";

export const bottomNavButton = style({
  textAlign: "center",
  width: "calc(50% - 8px)",
  height: "70px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  border: "1.5px solid 1e2024",

  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  fontFamily: '"Pretendard", sans-serif',
  fontSize: "16px",
  fontWeight: "500",
  // color: "#000000",
  // "@media": {
  //   "screen and (max-width: 400px)": {
  //     fontSize: "13px",
  //   },
  // },
});

export const img = style({
  transform: "scale(0.8)",
});
