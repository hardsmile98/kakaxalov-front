import earnImage from 'assets/images/earnImage.webp'
import earnText from 'assets/images/earnText.svg'
import earnIcon from 'assets/images/earnIcon.svg'
import Tasks from './Tasks'
import styles from './styles.module.css'
import { useGetTasksQuery } from 'services/api'
import { ErrorPage, PageLoader } from 'components'

function Earn () {
  const { data, isLoading, isError } = useGetTasksQuery(undefined)

  if (isError) {
    return <ErrorPage />
  }

  if (isLoading) {
    return <PageLoader />
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
          alt="earn image"
        />
      </div>

      <div className={styles.head}>
        <img
          src={earnIcon}
          alt="earn icon"
        />

        <h2>
          Ern
        </h2>
        <p>
          Выполняй задания и получай КАКАХИ, которые можешь потратить на бусты
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Задания
        </h5>

        <Tasks tasks={data?.tasks} />
      </div>
    </div>
  )
}

export default Earn
