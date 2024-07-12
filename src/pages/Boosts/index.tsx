import boostsImage from 'assets/images/boostsImage.webp';
import boostsText from 'assets/images/boostsText.svg';
import boostsIcon from 'assets/images/boostsIcon.svg';
import { useGetBoostsQuery } from 'services/api';
import { ErrorPage, Input, PageLoader } from 'components';
import { useLocale, useTelegram } from 'hooks';
import DailyBoosts from './Daily';
import Improvements from './Improvements';
import styles from './styles.module.css';
import Wallet from './Wallet';
import Nft from './Nft';
import Copyright from './Copyright';

function Boosts() {
  const { data, isLoading, isError } = useGetBoostsQuery(undefined);

  const { locale } = useLocale();

  const tg = useTelegram();

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.root}>
      <Input value={tg.initData} withCopy />

      <div>
        <div className={styles.imageWrapper}>
          <img
            className={styles.textImage}
            src={boostsText}
            alt="boosts text"
          />

          <img
            className={styles.image}
            src={boostsImage}
            alt="boosts"
          />
        </div>

        <div className={styles.head}>
          <img
            src={boostsIcon}
            alt="boosts icon"
          />

          <h2>
            {locale('Boosts')}
          </h2>
          <p>
            {locale('Boost levels and and collect more KKX points')}
          </p>
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('Daily')}
          </h5>

          <DailyBoosts boosts={data?.dailyList} />
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('Boosts with upgrading')}
          </h5>

          <Improvements boosts={data?.improveList} />
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('Wallet connecting')}
          </h5>

          <Wallet />
        </div>

        <div className={styles.blockWrapper}>
          <h5>
            {locale('NFT check')}
          </h5>

          <Nft />
        </div>
      </div>

      <div>
        <Copyright />
      </div>
    </div>
  );
}

export default Boosts;
