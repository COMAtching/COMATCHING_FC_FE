import { style } from "@vanilla-extract/css";

export const progressBar = style({
  backgroundColor: "#ffffff",
  height: "8px",
  position: "relative",
  width: "100%",
  marginBottom: "0px",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  },
});

export const progressBarFill = style({
  background: "#cc0000",
  height: "100%",
  transition: "width 0.2s ease-in-out",
});
