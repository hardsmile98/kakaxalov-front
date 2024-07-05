import { type Tasks as TaskType } from 'services';
import styles from './styles.module.css';
import Task from './Task';

interface TasksProps {
  tasks: TaskType['tasks'] | undefined
}

function Tasks({ tasks }: TasksProps) {
  return (
    <ul className={styles.root}>
      {tasks?.length !== 0 && tasks !== undefined
        ? tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))
        : 'Нет заданий'}
    </ul>
  );
}

export default Tasks;
