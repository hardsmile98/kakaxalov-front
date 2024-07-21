import { ErrorPage, PageLoader } from 'components';
import { useGetStatsQuery } from 'services/api';
import styles from './styles.module.css';

function Stats() {
  const { data, isLoading, isError } = useGetStatsQuery(undefined);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.root}>
      <h2>
        Статистика
      </h2>

      <div className={styles.stats}>
        {'Количество пользователей: '}
        <span>{data?.count}</span>
      </div>
    </div>
  );
}

export default Stats;
