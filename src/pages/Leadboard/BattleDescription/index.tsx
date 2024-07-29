import { formatTimer } from 'helpers/index';
import { useLocale } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { Leadboard } from 'services/api';

type BattleDescriptionProps = {
  activeBattle: Leadboard['activeBattle']
};

function BattleDescription({
  activeBattle,
}: BattleDescriptionProps) {
  const { locale } = useLocale();

  if (!activeBattle) {
    return <div>{locale('The battle has not started yet')}</div>;
  }

  if (activeBattle?.status === 'none') {
    return <div>{locale('The battle has not started yet')}</div>;
  }

  if (activeBattle?.status === 'finished') {
    return <div>{locale('The battle is over')}</div>;
  }

  if (activeBattle?.status === 'finishing') {
    return <div>{locale('The battle is over')}</div>;
  }

  const diffSeconds = Math.round((new Date(activeBattle.endDate).getTime() - Date.now()) / 1_000);

  if (diffSeconds <= 0) {
    return <div>{locale('The battle is over')}</div>;
  }

  const [seconds, setSeconds] = useState(diffSeconds);

  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    setSeconds((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        const newSeconds = Math.round(
          (new Date(activeBattle.endDate).getTime() - Date.now()) / 1_000,
        );

        setSeconds(newSeconds);
      }, 10_000);
    }
  }, []);

  useEffect(
    () => () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    },
    [],
  );

  const timer = formatTimer(seconds, locale, { withDay: true });

  return (
    <div>
      {locale('The battle will end in')}
      {' '}
      <span>
        {timer}
      </span>
    </div>
  );
}

export default BattleDescription;
