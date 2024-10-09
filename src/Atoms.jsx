import { atom } from "recoil";

export const progress = atom({
  key: "progress",
  default: {
    progressState: 100 / 14,
  },
});

export const userResult = atom({
  key: "userResult",
  default: {},
});

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    socialId: "",
    cheeringPlayer: "",
    age: 0,
    gender: "",
    cheerPropensity: "",
  },
});

export const matchResult = atom({
  key: "matchResult",
  default: {},
});
