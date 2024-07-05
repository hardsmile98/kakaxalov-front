import { formatNumber } from 'helpers/index';
import tagTypes from '../tagTypes';

interface TasksResponse {
  tasks: Array<{
    id: number
    title: string
    bonus: number
    completed: boolean
    link: string
    linkType: 'telegram' | 'other'
  }>
  success: boolean
}

const transformTask = (response: TasksResponse) => ({
  ...response,
  tasks: response.tasks.map((task) => ({
    ...task,
    bonus: formatNumber(task.bonus),
  })),
});

const getTasks = {
  query: () => '/api/tasks',

  transformResponse: transformTask,

  providesTags: [tagTypes.tasks],
};

type Tasks = ReturnType<typeof transformTask>;

export {
  type Tasks,
  getTasks,
};
