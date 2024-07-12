import { type Tasks as TaskType } from 'services';
import { useLocale } from 'hooks';
import styles from './styles.module.css';
import Task from './Task';

interface TasksProps {
  tasks: TaskType['tasks'] | undefined
}

function Tasks({ tasks }: TasksProps) {
  const { locale } = useLocale();

  return (
    <ul className={styles.root}>
      {tasks?.length !== 0 && tasks !== undefined
        ? tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))
        : locale('No tasks')}
    </ul>
  );
}

export default Tasks;
