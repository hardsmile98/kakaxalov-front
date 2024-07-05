import { useCompleteTaskMutation, type Tasks } from 'services';
import { ReactComponent as CheckIcon } from 'assets/images/checkIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'components';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

type TaskType = Tasks['tasks'][0];
interface TaskProps {
  task: TaskType
}

function Task({ task }: TaskProps) {
  const tg = useTelegram();

  const [isLinkClick, setLinkClick] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const refTimeout = useRef<NodeJS.Timeout | null>(null);

  const [completeTask, { isSuccess }] = useCompleteTaskMutation();

  const onClickLink = () => {
    tg.HapticFeedback.impactOccurred('light');

    if (task.linkType === 'telegram') {
      tg.openTelegramLink(task.link);
    } else {
      tg.openLink(task.link);
    }

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
      onClick={() => onClickLink()}
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
        {task.bonus}
        {' '}
        KKXP
      </div>
    </li>
  );
}

export default Task;
