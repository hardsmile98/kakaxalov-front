import dailyBoost2 from 'assets/images/helth.svg';
import dailyBoostModal1 from 'assets/images/dailyBoostModal1.webp';
import { Button, Modal } from 'components';
import {
  BoostSlugs, isErrorWithMessage, useApplyBoostMutation, type Boosts,
} from 'services';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { useDispatch } from 'store/index';
import { startBoost } from 'store/slices/game';
import { useLocale, useTelegram } from 'hooks';
import BoostButton from './Boost';
import styles from './styles.module.css';

const settingsMap: Record<
string,
{ modalImage: string, modalImageStyle: string }
> = {
  [BoostSlugs.magnit]: {
    modalImage: dailyBoostModal1,
    modalImageStyle: styles.modalImage1Style,
  },
  [BoostSlugs.energy]: {
    modalImage: dailyBoost2,
    modalImageStyle: styles.modalImage2Style,
  },
};

interface DailyBoostsProps {
  boosts?: Boosts['dailyList']
}

function DailyBoosts({ boosts }: DailyBoostsProps) {
  const tg = useTelegram();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { locale } = useLocale();

  const { enqueueSnackbar } = useSnackbar();

  const [selectBoost, setSelectBoost] = useState<null | { id: number, slug: string }>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [apply, {
    isLoading, isSuccess, isError, error,
  }] = useApplyBoostMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(locale('Boost applied'), { variant: 'success' });

      setModalOpen(false);
    }
  }, [enqueueSnackbar, isSuccess]);

  useEffect(() => {
    if (isError) {
      const errorMessage = isErrorWithMessage(error) && error.data.message;

      enqueueSnackbar(locale(errorMessage || '') ?? locale('Boost not applied'), { variant: 'error' });

      setModalOpen(false);
    }
  }, [enqueueSnackbar, error, isError]);

  if (boosts === undefined) {
    return null;
  }

  const setting = boosts.find((boost) => boost.id === selectBoost?.id);

  const applyBoost = () => {
    if (selectBoost === null) {
      return;
    }

    tg.HapticFeedback.impactOccurred('light');

    switch (selectBoost?.slug) {
      case BoostSlugs.magnit: {
        navigate('/');

        dispatch(startBoost(selectBoost));
        break;
      }

      default: {
        if (selectBoost?.id !== null) {
          apply(selectBoost.id);
        }
        break;
      }
    }
  };

  return (
    <>
      <div className={styles.root}>
        {boosts.map((boost, index) => (
          <BoostButton
            key={boost.slug}
            boost={boost}
            index={index}
            onStart={() => {
              tg.HapticFeedback.impactOccurred('light');

              setSelectBoost({ id: boost.id, slug: boost.slug });

              setModalOpen(true);
            }}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {setting !== undefined && (
          <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
              <img
                src={settingsMap[setting?.slug].modalImage}
                className={settingsMap[setting?.slug].modalImageStyle}
                alt={setting.title}
              />

              <h4>{locale(setting.title)}</h4>

              <p>{locale(setting.description)}</p>
            </div>

            <Button
              onClick={applyBoost}
              loading={isLoading}
            >
              {locale('Apply')}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default DailyBoosts;
