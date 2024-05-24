const gameSettings = {
  DEFAULT_GAME_TIME: 60,
  DURATION_ANIMATION_COIN_INITIAL: 1_000,
  DURATION_ANIMATION_COIN_MAX: 1_200,
  DURATION_ANIMATION_COIN_MIN: 800,
  DELAY_NEW_COIN_MIN: 1_000,
  DELAY_NEW_COIN_MAX: 1_400,
  DURATION_ANIMATION_EXPLOSION: 1_400,
  DELAY_NEW_COIN_WITH_BOOST_MIN: 400,
  DELAY_NEW_COIN_WITH_BOOST_MAX: 500,
  DURATION_ANIMATION_COIN_WITH_BOOST_MIN: 500,
  DURATION_ANIMATION_COIN_WITH_BOOST_MAX: 700,
  BOMB_DROP_CHANCE: 0.15
}

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
  finishing = 'FINISHING'
}

const positionArray = [
  Position.leftBottom,
  Position.leftTop,
  Position.rightBottom,
  Position.rightTop
]

export {
  gameSettings,
  Position,
  GameStatuses,
  positionArray
}
