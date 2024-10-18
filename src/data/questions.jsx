export const QUESTIONS = [
  <>
    오늘은 부천FC1995 경기날!
    <br />
    너무 떨린다
  </>,
  <>
    경기 전 선수들이 입장할 때,
    <br />내 반응은?
  </>,
  <>
    상대팀이 공격을 시작했어!
    <br />
    나는?
  </>,
  <>
    경기 중 VAR 판독이 나왔어!
    <br />내 반응은?
  </>,
  <>
    하프타임!
    <br />
    나는 친구와
  </>,
  <>
    경기가 끝났어!
    <br />
    어떤 생각이 먼저 들까?
  </>,
];

export const ANSWERS = [
  [
    {
      text: "꺄~ 오늘은 무슨 일이 일어날까?",
      scores: { socialType: 5, mukbangType: 2, soccerNoviceType: 1 },
    },
    {
      text: "경기장에서 먹을 메뉴를 생각한다",
      scores: { mukbangType: 5, soccerNoviceType: 2, socialType: 1 },
    },
    {
      text: "선수가 어떤 플레이를 보여줄지 기대한다",
      scores: { soccerExpertType: 5, focusType: 2, passionType: 1 },
    },
  ],
  [
    {
      text: "목이 터져라 응원한다",
      scores: { passionType: 5, socialType: 2, soccerExpertType: 1 },
    },
    {
      text: "선수들의 컨디션, 동작을 유심히 본다",
      scores: { focusType: 5, soccerExpertType: 2, mukbangType: 1 },
    },
    {
      text: "저 선수 귀엽다!",
      scores: { soccerNoviceType: 5, passionType: 2, focusType: 1 },
    },
  ],
  [
    {
      text: '"막아야 해!" 소리치며 응원한다',
      scores: { passionType: 5, socialType: 2, soccerExpertType: 1 },
    },
    {
      text: "우리팀의 수비 전략을 구상해본다",
      scores: { soccerExpertType: 5, focusType: 2, passionType: 1 },
    },
    {
      text: "(손에 간식을 들고)긴장하며 집중한다",
      scores: { mukbangType: 5, soccerNoviceType: 2, socialType: 1 },
    },
  ],
  [
    {
      text: "'제발 우리편에 유리하게' 마음 졸인다",
      scores: { soccerNoviceType: 5, mukbangType: 2, focusType: 1 },
    },
    {
      text: "VAR 판독 과정을 눈여겨보며 분석한다",
      scores: { focusType: 5, soccerExpertType: 2, mukbangType: 1 },
    },
    {
      text: "사람들과 VAR 결과에 대해 얘기한다",
      scores: { socialType: 5, passionType: 2, soccerNoviceType: 1 },
    },
  ],
  [
    {
      text: "후반 경기에 대해 예측한다",
      scores: { soccerExpertType: 5, focusType: 2, socialType: 1 },
    },
    {
      text: "전반전 끝나자마자 핸드폰 삼매경",
      scores: { socialType: 5, passionType: 3, soccerNoviceType: 2 },
    },
    {
      text: "말걸지 마! 에너지 충전 중",
      scores: { soccerNoviceType: 5, mukbangType: 2, soccerExpertType: 1 },
    },
  ],
  [
    {
      text: "끝나자마자 오늘의 경기 분석 시작!",
      scores: { focusType: 5, soccerExpertType: 2, passionType: 1 },
    },
    {
      text: "모두 함께 기념사진을 찍어야지!",
      scores: { passionType: 5, socialType: 2, mukbangType: 1 },
    },
    {
      text: "배고프다! 뭐 먹으러 가지!",
      scores: { mukbangType: 5, soccerNoviceType: 2, focusType: 1 },
    },
  ],
];
