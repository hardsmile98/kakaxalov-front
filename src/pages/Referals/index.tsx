import inviteImage from 'assets/images/inviteImage.webp';
import inviteIcon from 'assets/images/inviteIcon.svg';
import {
  Button, ErrorPage, Input, Loader, UserList,
} from 'components';
import { useGetProfileQuery, useGetReferalsQuery } from 'services/api';
import { envs } from 'constants/index';
import { formatNumber } from 'helpers/index';
import { useLocale, useTelegram } from 'hooks';
import styles from './styles.module.css';

function Referals() {
  const tg = useTelegram();

  const { data: profile } = useGetProfileQuery(undefined);

  const inviteCode = profile?.user?.inviteCode;

  const inviteUrl = `${envs.miniAppUrl}?startapp=refCode_${inviteCode}`;

  const { isLoading, isError, data: referrals } = useGetReferalsQuery(undefined);

  const { locale } = useLocale();

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={inviteImage} alt="invite" />
        </div>

        <div className={styles.head}>
          <img src={inviteIcon} alt="ivite icon" />

          <h2>
            {locale('Invite your friends and get KKX POINTS together')}
          </h2>

          <p>
            {locale('You get KKX POINTS for each friend you bring in')}
          </p>

          <div className={styles.description}>
            <p>
              {locale('For an ordinary friend - {bonus} KKX POINTS').replace(
                /{bonus}/g,
                formatNumber(referrals?.bonusForInvite || 0),
              )}
            </p>

            <p>
              {locale('For a friend with premium - {bonus} KKX POINTS').replace(
                /{bonus}/g,
                formatNumber(referrals?.bonusForInviteWithPremium || 0),
              )}
            </p>
          </div>
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('Referral link')}
          </h5>

          <Input
            value={inviteUrl}
            readOnly
            withCopy
          />
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('Your friends')}
          </h5>

          {isLoading
            ? (
              <div className={styles.loader}>
                <Loader />
              </div>
            )
            : <UserList list={referrals?.referals} />}
        </div>
      </div>

      <Button
        onClick={() => tg.openTelegramLink(`https://t.me/share/url?url=${inviteUrl}`)}
        className={styles.button}
      >
        {locale('Invite')}
      </Button>
    </div>
  );
}

export default Referals;
