import { useState } from 'react';
import topImage from 'assets/images/topImage.webp';
import topText from 'assets/images/topText.svg';
import topIcon from 'assets/images/topIcon.svg';
import farmIcon from 'assets/images/earnIcon.svg';
import inviteIcon from 'assets/images/medalIcon.svg';
import { ErrorPage, PageLoader, UserList } from 'components';
import { useGetLeadboardQuery } from 'services/api';
import { useLocale } from 'hooks';
import styles from './styles.module.css';

function Leadboard() {
  const [tab, setTab] = useState<'farm' | 'invite'>('farm');

  const { isLoading, isError, data } = useGetLeadboardQuery(undefined);

  const { locale } = useLocale();

  const topList = data?.[tab]?.top;

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.textImage}
          src={topText}
          alt="top text"
        />

        <img
          className={styles.image}
          src={topImage}
          alt="leadboard"
        />
      </div>

      <div className={styles.head}>
        <img
          src={topIcon}
          alt="top icon"
        />

        <h2>
          {locale('Leaderboard')}
        </h2>

        <p>
          {locale('Collect more KKX POINTS to get to the top of the leaders and get more rewards')}
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={tab === 'farm' ? styles.buttonActive : ''}
          onClick={() => setTab('farm')}
          type="button"
        >
          <img src={farmIcon} alt="farm" />
          {locale('By extraction')}
        </button>

        <button
          className={tab === 'invite' ? styles.buttonActive : ''}
          onClick={() => setTab('invite')}
          type="button"
        >
          <img src={inviteIcon} alt="invite" />
          {locale('By friends')}
        </button>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          {locale('Leaders')}
        </h5>

        <UserList type="numeric" list={topList} />
      </div>

      <div className={styles.scoreWrapper}>
        <div className={styles.positionWrapper}>
          <div>
            {data?.[tab].position.index}
          </div>

          <div>
            {locale('Your ranking')}
          </div>
        </div>

        <div className={styles.score}>
          {data?.[tab].position.leadboardScore}
          {' '}
          KKX POITNS
        </div>
      </div>
    </div>
  );
}

export default Leadboard;
