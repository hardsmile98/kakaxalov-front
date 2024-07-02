import { useCompleteTaskMutation, type TasksResponse } from 'services';
import { formatNumber } from 'helpers';
import { ReactComponent as CheckIcon } from 'assets/images/checkIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'components';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

interface TaskProps {
  task: TasksResponse['tasks'][0]
}

function Task({ task }: TaskProps) {
  const tg = useTelegram();

  const [isLinkClick, setLinkClick] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const refTimeout = useRef<NodeJS.Timeout | null>(null);

  const [completeTask, { isSuccess }] = useCompleteTaskMutation();

  const onClickLink = (link: string) => {
    tg.openLink(link);
    setLinkClick(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLinkClick) {
      setLoading(true);

      refTimeout.current = setTimeout(() => {
        completeTask(task.id);
      }, 10_000);
    }
  }, [completeTask, task.id, isLinkClick]);

  useEffect(
    () => () => {
      if (refTimeout.current !== null) {
        clearTimeout(refTimeout.current);
      }
    },
    [],
  );

  return (
    <li
      className={`${styles.link} ${
        task.completed || isLoading ? styles.disabled : ''
      }`}
      onClick={() => onClickLink(task.link)}
      aria-hidden="true"
    >
      <div className={styles.wrapper}>
        {isLoading
          ? <Loader />
          : <CheckIcon className={task.completed ? styles.checked : styles.icon} />}

        <div>{task.title}</div>
      </div>

      <div className={styles.bonus}>
        +
        {formatNumber(task.bonus, { minimumFractionDigits: 0 })}
        {' '}
        KAKAX
      </div>
    </li>
  );
}

export default Task;
