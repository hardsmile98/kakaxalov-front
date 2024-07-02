import { formatTimer } from 'helpers/index';
import { useEffect, useRef, useState } from 'react';
import { useGetBoostsQuery } from 'services/api';

interface TimerProps {
  recoverySeconds: number
  useTimestamp: string
}

const getSeconds = (useTimestamp: string, recoverySeconds: number) => {
  const recoveryTimestamp = +useTimestamp + recoverySeconds * 1000;
  const timerSeconds = Math.round((recoveryTimestamp - Date.now()) / 1_000);
  return timerSeconds;
};

function Timer({
  recoverySeconds,
  useTimestamp,
}: TimerProps) {
  const [seconds, setSeconds] = useState(getSeconds(useTimestamp, recoverySeconds));

  const { refetch } = useGetBoostsQuery(undefined);

  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  const isTimerEnd = seconds <= 0;

  useEffect(() => {
    if (isTimerEnd) {
      refetch();
    }
  }, [refetch, isTimerEnd]);

  useEffect(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSeconds(getSeconds(useTimestamp, recoverySeconds));
      }, 10_000);
    }
  }, [useTimestamp, recoverySeconds]);

  useEffect(() => () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const timer = formatTimer(seconds);

  return timer;
}

export default Timer;
