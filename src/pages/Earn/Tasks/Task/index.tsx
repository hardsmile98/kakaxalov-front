import { Link } from 'react-router-dom'
import { useCompleteTaskMutation, type TasksResponse } from 'services'
import { formatNumber } from 'helpers'
import { ReactComponent as CheckIcon } from 'assets/images/checkIcon.svg'
import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import { Loader } from 'components'

interface TaskProps {
  task: TasksResponse['tasks'][0]
}

function Task ({ task }: TaskProps) {
  const [isLinkClick, setLinkClick] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const refTimeout = useRef<NodeJS.Timeout | null>(null)

  const [completeTask, { isSuccess }] = useCompleteTaskMutation()

  useEffect(() => {
    if (isSuccess) {
      setLoading(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLinkClick) {
      setLoading(true)

      refTimeout.current = setTimeout(() => {
        void completeTask(task.id)
      }, 10_000)
    }
  }, [completeTask, task.id, isLinkClick])

  return (
    <li className={styles.task}>
      <Link
        to={task.link}
        target="_blank"
        className={`${styles.link} ${task.completed ? styles.disabled : ''}`}
        onClick={() => setLinkClick(true)}
      >
        <div className={styles.wrapper}>
          {isLoading
            ? <Loader />
            : <CheckIcon
            className={task.completed ? styles.checked : styles.icon}
          />}

          <div>{task.title}</div>
        </div>

        <div className={styles.bonus}>
          +{formatNumber(task.bonus, { minimumFractionDigits: 0 })} KAKAX
        </div>
      </Link>
    </li>
  )
}

export default Task