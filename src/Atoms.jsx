import { atom } from "recoil";

export const progress = atom({
  key: "progress",
  default: {
    progressState: 100 / 13,
  },
});

export const userResult = atom({
  key: "userResult",
  default: {
    cheerPropensity: "",
    players: [],
  },
});

export const totalScores = atom({
  key: "totalScores",
  default: {
    passionType: 0,
    focusType: 0,
    soccerNoviceType: 0,
    soccerExpertType: 0,
    mukbangType: 0,
    socialType: 0,
  },
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
