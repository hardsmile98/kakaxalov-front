const gameSettings = {
  DURATION_BOOST_MAGNIT: 20,
  DURATION_ANIMATION_COIN_INITIAL: 800,
  DURATION_ANIMATION_COIN_MAX: 900,
  DURATION_ANIMATION_COIN_MIN: 600,
  DELAY_NEW_COIN_MIN: 700,
  DELAY_NEW_COIN_MAX: 1_000,
  DURATION_ANIMATION_EXPLOSION: 1_400,
  DELAY_NEW_COIN_WITH_BOOST_MIN: 300,
  DELAY_NEW_COIN_WITH_BOOST_MAX: 400,
  DURATION_ANIMATION_COIN_WITH_BOOST_MIN: 300,
  DURATION_ANIMATION_COIN_WITH_BOOST_MAX: 400,
  BOMB_DROP_CHANCE: 0.15,
  KING_COIN_CHANCE: 0.1,
  BONUS_FOR_KING_COIN: 9,
};

enum Position {
  initial = 'initial',
  leftTop = 'leftTop',
  leftBottom = 'leftBottom',
  rightTop = 'rightTop',
  rightBottom = 'rightBottom',
}

enum GameStatuses {
  notRuning = 'NOT_RUNNING',
  started = 'STARTED',
  runing = 'RUNING',
  finishing = 'FINISHING',
}

const positionArray = [
  Position.leftBottom,
  Position.leftTop,
  Position.rightBottom,
  Position.rightTop,
];

export {
  gameSettings,
  Position,
  GameStatuses,
  positionArray,
};
