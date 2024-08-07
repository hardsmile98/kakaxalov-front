import earnImage from 'assets/images/earnImage.webp';
import earnText from 'assets/images/earnText.svg';
import earnIcon from 'assets/images/earnIcon.svg';
import { useGetTasksQuery } from 'services/api';
import { ErrorPage, PageLoader } from 'components';
import { useLocale } from 'hooks';
import Tasks from './Tasks';
import styles from './styles.module.css';

function Earn() {
  const { data, isLoading, isError } = useGetTasksQuery(undefined);

  const { locale } = useLocale();

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
          src={earnText}
          alt="earn text"
        />

        <img
          className={styles.image}
          src={earnImage}
          alt="earn"
        />
      </div>

      <div className={styles.head}>
        <img
          src={earnIcon}
          alt="earn icon"
        />

        <h2>
          Earn
        </h2>
        <p>
          {locale('Complete tasks and get KKX POINTS, which you can spend on boosts')}
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          {locale('Tasks')}
        </h5>

        <Tasks tasks={data?.tasks} />
      </div>
    </div>
  );
}

export default Earn;
