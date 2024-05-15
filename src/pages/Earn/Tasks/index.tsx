import { Link } from 'react-router-dom'
import { ReactComponent as CheckIcon } from 'assets/images/checkIcon.svg'
import styles from './styles.module.css'

const tasks = [
  {
    id: 1,
    title: 'Подписаться на канал',
    href: '',
    bonus: 300,
    completed: true
  },
  {
    id: 2,
    title: 'Подписаться на чат',
    href: '',
    bonus: 200,
    completed: false
  }
]

function Tasks () {
  return (
    <ul className={styles.root}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          <Link to={task.completed ? '' : task.href} className={styles.link}>
            <div className={styles.wrapper}>
              <CheckIcon className={task.completed ? styles.checked : styles.icon} />

              <div>{task.title}</div>
            </div>

            <div className={styles.bonus}>
              {task.bonus} KAKAX
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Tasks
