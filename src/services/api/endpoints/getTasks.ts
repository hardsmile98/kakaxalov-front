import tagTypes from '../tagTypes';

interface TasksResponse {
  tasks: Array<{
    id: number
    title: string
    bonus: number
    completed: boolean
    link: string
  }>
  success: boolean
}

const getTasks = {
  query: () => '/api/tasks',

  providesTags: [tagTypes.tasks],
};

export {
  type TasksResponse,
  getTasks,
};
