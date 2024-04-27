import topImage from 'assets/images/topImage.webp'
import topIcon from 'assets/images/topIcon.svg'
import { UserList } from 'components'
import styles from './styles.module.css'

const topList = [
  {
    id: 1,
    name: 'Alex',
    value: '150.000 KAKAX'
  },
  {
    id: 2,
    name: 'Nick',
    value: '10.5000 KAKAX'
  },
  {
    id: 3,
    name: 'Moty',
    value: '10.000 KAKAX'
  },
  {
    id: 4,
    name: 'Alex',
    value: '5.000 KAKAX'
  },
  {
    id: 5,
    name: 'Nick',
    value: '3.000 KAKAX'
  }
]

function Leadboard () {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={topImage}
          alt="top image"
        />
      </div>

      <div className={styles.head}>
        <img
          src={topIcon}
          alt="top icon"
        />

        <h2>
          Топ 100 говнарей
        </h2>
        <p>
          Собирай больше КАКАХ, чтобы попасть в топ комьюнити, где каждый день идет раздача
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Топ 100
        </h5>

        <UserList type="numeric" list={topList} />
      </div>

      <div className={styles.scoreWrapper}>
        <div className={styles.positionWrapper}>
          <div>
            13.3K
          </div>

          <div>
            Ваш рейтинг
          </div>
        </div>

        <div className={styles.score}>
          40.200 KAKAX
        </div>
      </div>
    </div>
  )
}

export default Leadboard
