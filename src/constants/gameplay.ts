const gameSettings = {
  DEFAULT_GAME_TIME: 60,

  // old
  INITIAL_DURATION_ANIMATION_COIN: 1_500,
  MIN_DURATION_ANIMATION_COIN: 1_000,
  MAX_DURATION_ANIMATION_COIN: 1_400,
  BOMB_DROP_CHANCE: 0.15,
  MIN_DELAY_NEW_COIN: 1_500,
  MAX_DELAY_NEW_COIN: 2_000,
  DURATION_ANIMATION_EXPLOSION: 1_500
}

enum Position {
  initial = 'initial',
  leftTop = 'leftTop',
  leftBottom = 'leftBottom',
  rightTop = 'rightTop',
  rightBottom = 'rightBottom',
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
  positionArray
}
