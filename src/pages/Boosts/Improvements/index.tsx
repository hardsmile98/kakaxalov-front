import improvement2 from 'assets/images/improvement2.svg';
import { Boost } from 'components';
import {
  BoostSlugs, useGetProfileQuery, useImproveBoostMutation, type Boosts,
} from 'services';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

const settingsMap: Record<string, { icon: string, iconStyle: string }> = {
  [BoostSlugs.energy]: {
    icon: improvement2,
    iconStyle: styles.improvement2Image,
  },
};

interface ImprovementsProps {
  boosts?: Boosts['improveList']
}

function Improvements({ boosts }: ImprovementsProps) {
  const tg = useTelegram();

  const { enqueueSnackbar } = useSnackbar();

  const { data } = useGetProfileQuery(undefined);

  const currentScore = data?.user?.score !== undefined
    ? data.user.score
    : 0;

  const [improve, { isLoading, isSuccess, isError }] = useImproveBoostMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Ваш буст улучшен', { variant: 'success' });
    }
  }, [enqueueSnackbar, isSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Ошибка прокачки буста', { variant: 'error' });
    }
  }, [enqueueSnackbar, isError]);

  if (boosts?.length === 0 || boosts === undefined) {
    return null;
  }

  return (
    <ul className={styles.root}>
      {boosts.map((boost) => (
        <Boost
          color="primary"
          key={boost.slug}
          loading={isLoading}
          onClick={() => {
            tg.HapticFeedback.impactOccurred('light');

            improve(boost.id);
          }}
          boost={{
            ...boost,
            disabled: boost.disabled || currentScore < boost.levelPrice,
            icon: settingsMap[boost.slug].icon,
            iconStyle: settingsMap[boost.slug].iconStyle,
          }}
        />
      ))}
    </ul>
  );
}

export default Improvements;
