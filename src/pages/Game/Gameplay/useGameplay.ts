import { useCallback, useEffect, useRef } from 'react';
import {
  gameSettings,
  type Position,
  GameStatuses,
  positionArray,
} from 'constants/index';
import { useDispatch, useSelector } from 'store';
import {
  decrementTimer,
  setGameStatus,
  setInitial,
  setPosition,
  setIsBomb,
  setTimer,
  setCoinPosition,
  hideExplosion,
  incrementCoin,
  caughtBomb,
} from 'store/slices/game';
import {
  useEndGameMutation,
  useGetNftBonusQuery,
  useGetProfileQuery,
  useStartGameMutation,
} from 'services/api';
import { randomInteger } from 'helpers/index';
import { useTonWallet } from '@tonconnect/ui-react';

const useGameplay = () => {
  const dispatch = useDispatch();

  const { data } = useGetProfileQuery(undefined);

  const wallet = useTonWallet();

  const { data: { bonus = 0 } = {} } = useGetNftBonusQuery(wallet?.account.walletStateInit);

  const game = useSelector((state) => state.game);

  const isGameAvailable = data?.user.amountEnergy !== 0;

  const gameTime = game.boost !== null
    ? gameSettings.DURATION_BOOST_DEVOURER
    : data?.user.gameTime;

  const config = useRef({
    ...game,
    duration: gameSettings.DURATION_ANIMATION_COIN_INITIAL,
  });

  config.current = {
    ...config.current,
    ...game,
  };

  const coinRef = useRef<null | HTMLImageElement>(null);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const hideBombRef = useRef<null | NodeJS.Timeout>(null);

  const changePosition = (newPosition: Position) => {
    if (game.boost !== null) {
      return;
    }

    if (game.gameStatus === GameStatuses.runing) {
      dispatch(setPosition(newPosition));
    }
  };

  const [startGame, {
    data: gameData,
    isSuccess: isGameStarted,
    isLoading: isGameStarting,
  }] = useStartGameMutation();

  const runGame = () => dispatch(setGameStatus(GameStatuses.started));

  // Старт игры
  useEffect(() => {
    if (game.gameStatus === GameStatuses.started) {
      startGame({ boostId: game.boostId ?? undefined });
    }
  }, [startGame, game.gameStatus, game.boostId]);

  // Запуск таймера
  useEffect(() => {
    if (isGameStarted && game.gameStatus === GameStatuses.started) {
      dispatch(setTimer(gameTime));
      dispatch(setGameStatus(GameStatuses.runing));
    }
  }, [dispatch, gameTime, game.gameStatus, isGameStarted]);

  // Таймер
  useEffect(() => {
    if (timerRef.current === null && game.gameStatus === GameStatuses.runing) {
      timerRef.current = setInterval(() => dispatch(decrementTimer()), 1_000);
    }
  }, [dispatch, game.gameStatus]);

  const stopGame = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    dispatch(setGameStatus(GameStatuses.finishing));
  }, [dispatch]);

  // Завершать игру при окончании таймера
  useEffect(() => {
    if (game.gameTimer === 0 && game.gameStatus === GameStatuses.runing) {
      stopGame();
    }
  }, [stopGame, game.gameTimer, game.gameStatus]);

  const [endGame, {
    isSuccess: isGameEnded,
  }] = useEndGameMutation();

  useEffect(() => {
    if (isGameEnded && game.gameStatus === GameStatuses.finishing) {
      dispatch(setInitial());
    }
  }, [dispatch, game.gameStatus, isGameEnded]);

  useEffect(() => {
    if (game.gameStatus === GameStatuses.finishing) {
      endGame({
        id: gameData.game.id,
        hash: gameData.game.hash,
        score: game.coin,
      });
    }
  }, [endGame, gameData, game.coin, game.gameStatus]);

  const generateCoin = useCallback(() => {
    let isBomb = false;

    if (config.current.boost === null) {
      isBomb = randomInteger(0, 10) < gameSettings.BOMB_DROP_CHANCE * 10;
    }

    dispatch(setIsBomb(isBomb));

    config.current = {
      ...config.current,
      duration: randomInteger(
        config.current.boost === null
          ? gameSettings.DURATION_ANIMATION_COIN_MIN - ((1 / config.current.gameTimer) * 100)
          : gameSettings.DURATION_ANIMATION_COIN_WITH_BOOST_MIN,
        config.current.boost === null
          ? gameSettings.DURATION_ANIMATION_COIN_MAX - ((1 / config.current.gameTimer) * 100)
          : gameSettings.DURATION_ANIMATION_COIN_WITH_BOOST_MAX,
      ),
    };

    const randomIndex = randomInteger(0, positionArray.length - 1);

    dispatch(setCoinPosition(positionArray[randomIndex]));
  }, [dispatch]);

  useEffect(() => {
    if (timeoutRef.current === null
      && game.coinPosition === null
      && game.gameStatus === GameStatuses.runing) {
      timeoutRef.current = setTimeout(
        () => generateCoin(),
        randomInteger(
          config.current.boost === null
            ? gameSettings.DELAY_NEW_COIN_MIN - ((1 / config.current.gameTimer) * 100)
            : gameSettings.DELAY_NEW_COIN_WITH_BOOST_MIN,
          config.current.boost === null
            ? gameSettings.DELAY_NEW_COIN_MAX - ((1 / config.current.gameTimer) * 100)
            : gameSettings.DELAY_NEW_COIN_WITH_BOOST_MAX,
        ),
      );
    }
  }, [game.coinPosition, game.gameStatus, generateCoin]);

  const check = useCallback(() => {
    if (config.current.boost !== null) {
      dispatch(incrementCoin({ bonus }));
    } else if (config.current.position === config.current.coinPosition) {
      if (config.current.isBomb) {
        dispatch(caughtBomb());

        hideBombRef.current = setTimeout(() => {
          dispatch(hideExplosion());
          stopGame();
        }, gameSettings.DURATION_ANIMATION_EXPLOSION);
      } else {
        dispatch(incrementCoin({ bonus }));
      }
    }

    dispatch(setCoinPosition(null));

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [dispatch, stopGame]);

  useEffect(() => {
    if (coinRef.current !== null) {
      coinRef.current.addEventListener('animationend', check, false);
    }
    return () => {
      dispatch(setInitial());

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      if (hideBombRef.current !== null) {
        clearTimeout(hideBombRef.current);
      }
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [dispatch, check]);

  const isButtonLoading = isGameStarting;

  return {
    game,
    config,
    isGameAvailable,

    coinRef,

    isButtonLoading,

    changePosition,
    runGame,
  };
};

export default useGameplay;
