/* eslint-disable react/no-array-index-key */
import { formatTimer } from 'helpers/index';
import { useEffect, useRef, useState } from 'react';
import helth from 'assets/images/helth.svg';
import { publicApi, useCheckEnergyQuery } from 'services/api';
import { Loader } from 'components';
import { useDispatch } from 'react-redux';
import tagTypes from 'services/api/tagTypes';
import { useLocale } from 'hooks';
import styles from './styles.module.css';

interface TimerProps {
  energyRecoveryTimeSeconds: number
  useEneryTimestamp: string
  amountEnergy: number
}

const getSeconds = (useEneryTimestamp: string, energyRecoveryTimeSeconds: number) => {
  const recoveryTimestamp = +useEneryTimestamp + energyRecoveryTimeSeconds * 1000;
  const timerSeconds = Math.round((recoveryTimestamp - Date.now()) / 1_000);
  return timerSeconds;
};

function Helths({
  energyRecoveryTimeSeconds,
  useEneryTimestamp,
  amountEnergy,
}: TimerProps) {
  const dispatch = useDispatch();

  const { locale } = useLocale();

  const [seconds, setSeconds] = useState(getSeconds(useEneryTimestamp, energyRecoveryTimeSeconds));

  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  const { isLoading, data, refetch } = useCheckEnergyQuery(undefined);

  const isTimerEnd = seconds <= 0;

  useEffect(() => {
    if (data?.recovery === true) {
      dispatch(publicApi.util.invalidateTags([tagTypes.profile]));
    }
  }, [dispatch, data?.recovery]);

  useEffect(() => {
    if (isTimerEnd) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      refetch();
    }
  }, [refetch, isTimerEnd]);

  useEffect(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSeconds(getSeconds(useEneryTimestamp, energyRecoveryTimeSeconds));
      }, 10_000);
    }
  }, [energyRecoveryTimeSeconds, useEneryTimestamp]);

  useEffect(() => () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const timer = formatTimer(seconds, locale);

  if (amountEnergy > 0) {
    return (
      <span>
        {new Array(amountEnergy)
          .fill(null)
          .map((_, idx) => <img key={idx} src={helth} alt="helth" />)}
      </span>
    );
  }

  return (
    <div className={styles.root}>
      {isLoading ? <Loader size={12} width={3} /> : timer }
    </div>
  );
}

export default Helths;
