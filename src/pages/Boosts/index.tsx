import boostsImage from 'assets/images/boostsImage.webp';
import boostsText from 'assets/images/boostsText.svg';
import boostsIcon from 'assets/images/boostsIcon.svg';
import { useGetBoostsQuery } from 'services/api';
import { ErrorPage, PageLoader } from 'components';
import DailyBoosts from './Daily';
import Improvements from './Improvements';
import styles from './styles.module.css';
import Wallet from './Wallet';

function Boosts() {
  const { data, isLoading, isError } = useGetBoostsQuery(undefined);

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
          Boosts
        </h2>
        <p>
          Прокачивай уровни буста и собирай больше КАКАХ
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Eжеденевно
        </h5>

        <DailyBoosts boosts={data?.dailyList} />
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Бусты с прокачкой
        </h5>

        <Improvements boosts={data?.improveList} />
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Подключение кошелька
        </h5>

        <Wallet />
      </div>
    </div>
  );
}

export default Boosts;
