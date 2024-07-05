import topImage from 'assets/images/topImage.webp';
import topText from 'assets/images/topText.svg';
import topIcon from 'assets/images/topIcon.svg';
import { ErrorPage, PageLoader, UserList } from 'components';
import { useGetTop100Query } from 'services/api';
import styles from './styles.module.css';

function Leadboard() {
  const { isLoading, isError, data } = useGetTop100Query(undefined);

  const topList = data?.top;

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
          Таблица лидеров
        </h2>
        <p>
          Собирай больше KKX POINTS, чтобы выбиться в топ 100 лидеров,
          среди которых происходит розыгрыш призов
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Лидеры
        </h5>

        <UserList type="numeric" list={topList} />
      </div>

      <div className={styles.scoreWrapper}>
        <div className={styles.positionWrapper}>
          <div>
            {data?.position.index}
          </div>

          <div>
            Ваш рейтинг
          </div>
        </div>

        <div className={styles.score}>
          {data?.position.leadboardScore}
          {' '}
          KKX POITNS
        </div>
      </div>
    </div>
  );
}

export default Leadboard;
