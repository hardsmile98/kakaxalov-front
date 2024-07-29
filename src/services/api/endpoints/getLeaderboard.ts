import { formatNumber } from 'helpers';
import tagTypes from '../tagTypes';

interface LeadboardResponse {
  farm: {
    top: Array<{
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
      score: number
      name: string
      username: string
    }>
    position: {
      index: number
      score: number
    }
  }
  battle: {
    top: Array<{
      score: number
      name: string
      username: string
    }>
    position: {
      index: number
      score: number
    }
  }
  activeBattle: {
    status: 'none' | 'running' | 'finishing' | 'finished',
    startDate: string,
    endDate: string,
  } | undefined
  success: boolean
}

const transformTop100 = (response: LeadboardResponse) => {
  const topFarmFormatted = response.farm?.top?.map((user, index) => ({
    id: `farm_${index}`,
    name: user.name ?? 'Not indicated',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  const topInviteFormatted = response.invite?.top?.map((user, index) => ({
    id: `invite_${index}`,
    name: user.name ?? 'Not indicated',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  const topBattleFormatted = response.battle?.top?.map((user, index) => ({
    id: `invite_${index}`,
    name: user.name ?? 'Not indicated',
    value: `${formatNumber(user.score)} KKXP`,
  }));

  return {
    farm: {
      top: topFarmFormatted,
      position: {
        ...response.farm?.position,
        leadboardScore: formatNumber(response.farm?.position?.score),
      },
    },
    invite: {
      top: topInviteFormatted,
      position: {
        ...response.invite?.position,
        leadboardScore: formatNumber(response.invite?.position?.score),
      },
    },
    battle: {
      top: topBattleFormatted,
      position: {
        ...response.battle?.position,
        leadboardScore: formatNumber(response.battle?.position?.score),
      },
    },
    activeBattle: response.activeBattle,
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
