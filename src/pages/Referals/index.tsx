import inviteImage from 'assets/images/inviteImage.webp';
import inviteIcon from 'assets/images/inviteIcon.svg';
import {
  Button, Input, Loader, UserList,
} from 'components';
import { useGetProfileQuery, useGetReferalsQuery } from 'services/api';
import { envs, gameSettings } from 'constants/index';
import { formatNumber } from 'helpers/index';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

function Referals() {
  const tg = useTelegram();

  const { data: profile } = useGetProfileQuery(undefined);

  const inviteCode = profile?.user?.inviteCode;

  const inviteUrl = `${envs.miniAppUrl}?startapp=refCode_${inviteCode}`;

  const { isLoading, data } = useGetReferalsQuery(undefined);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={inviteImage} alt="invite" />
        </div>

        <div className={styles.head}>
          <img src={inviteIcon} alt="ivite icon" />

          <h2>Пригласи друзей и собирай KKX POINTS вместе</h2>
          <p>
            За каждого приведенного друга, ты получаешь по
            {' '}
            {formatNumber(gameSettings.BONUS_FOR_INVITE)}
            {' '}
            KKX POINTS
          </p>
        </div>

        <div className={styles.blockWrapper}>
          <h5>Реферальная ссылка</h5>

          <Input
            value={inviteUrl}
            readOnly
            withCopy
          />
        </div>

        <div className={styles.blockWrapper}>
          <h5>Твои говнари</h5>

          {isLoading
            ? (
              <div className={styles.loader}>
                <Loader />
              </div>
            )
            : <UserList list={data} />}
        </div>
      </div>

      <Button
        onClick={() => tg.openTelegramLink(`https://t.me/share/url?${inviteUrl}`)}
        className={styles.button}
      >
        Пригласить
      </Button>
    </div>
  );
}

export default Referals;
