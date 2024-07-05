import { formatNumber } from 'helpers';
import tagTypes from '../tagTypes';

interface Top100Response {
  top: Array<{
    userId: number
    score: number
    name: string
    username: string
  }>
  position: {
    index: number
    score: number
  }
  success: boolean
}

const transformTop100 = (response: Top100Response) => {
  const topFormatted = response.top.map((user) => ({
    id: user.userId,
    name: user.name ?? 'Не указано',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  return {
    ...response,
    position: {
      ...response.position,
      leadboardScore: formatNumber(response.position.score),
    },
    top: topFormatted,
  };
};

const getTop100 = {
  query: () => '/api/users/top',

  transformResponse: transformTop100,

  providesTags: [tagTypes.leadboard],
};

type Top100 = ReturnType<typeof transformTop100>;

export {
  getTop100,
  type Top100,
};
