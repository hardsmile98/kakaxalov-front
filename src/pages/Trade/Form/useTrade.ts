import { useState } from 'react'

export enum TradeTypes {
  GAMECOIN_TO_KAKAX = 'gamecoinToKakax',
  KAKAX_TO_GAMECOIN = 'kakaxToGamecoin',
}

const CONFIGS = {
  [TradeTypes.GAMECOIN_TO_KAKAX]: {
    max: 100_000,
    rate: 0.0005,
    sentSlug: 'GAME COIN',
    getSlug: '$KAKAX'
  },
  [TradeTypes.KAKAX_TO_GAMECOIN]: {
    max: 1_000,
    rate: 2_000,
    sentSlug: '$KAKAX',
    getSlug: 'GAME COIN'
  }
}

const useTrade = () => {
  const [sentCoin, setSentCoin] = useState('0')

  const [tradeType, setTradeType] = useState(TradeTypes.GAMECOIN_TO_KAKAX)

  const config = CONFIGS[tradeType]

  const changeTradeType = () => {
    setTradeType((prev) => {
      if (prev === TradeTypes.GAMECOIN_TO_KAKAX) {
        return TradeTypes.KAKAX_TO_GAMECOIN
      }

      return TradeTypes.GAMECOIN_TO_KAKAX
    })
  }

  const getCoin = +sentCoin * config.rate

  return {
    getCoin,
    sentCoin,
    setSentCoin,
    changeTradeType,
    config
  }
}

export default useTrade
