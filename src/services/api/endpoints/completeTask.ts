import tagTypes from '../tagTypes';

const completeTask = {
  query: (taskId: number) => ({
    url: '/api/tasks',
    method: 'POST',
    body: {
      taskId,
    },
  }),

  invalidatesTags: [tagTypes.tasks, tagTypes.leadboard, tagTypes.profile],
};

export {
  completeTask,
};
