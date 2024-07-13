import { formatNumber } from 'helpers';
import tagTypes from '../tagTypes';

interface LeadboardResponse {
  farm: {
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
  }
  invite: {
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
  }
  success: boolean
}

const transformTop100 = (response: LeadboardResponse) => {
  const topFarmFormatted = response.farm.top.map((user) => ({
    id: user.userId,
    name: user.name ?? 'Not indicated',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  const topInviteFormatted = response.invite.top.map((user) => ({
    id: user.userId,
    name: user.name ?? 'Not indicated',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  return {
    farm: {
      top: topFarmFormatted,
      position: {
        ...response.farm.position,
        leadboardScore: formatNumber(response.farm.position.score),
      },
    },
    invite: {
      top: topInviteFormatted,
      position: {
        ...response.invite.position,
        leadboardScore: formatNumber(response.invite.position.score),
      },
    },
  };
};

const getLeadboard = {
  query: () => '/api/users/top',

  transformResponse: transformTop100,

  providesTags: [tagTypes.leadboard],
};

type Leadboard = ReturnType<typeof transformTop100>;

export {
  getLeadboard,
  type Leadboard,
};
