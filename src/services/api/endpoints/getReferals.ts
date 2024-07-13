import { formatNumber } from 'helpers/index';

interface ReferalsResponse {
  referals: Array<{
    userId: number
    name: string
    username: string
    isPremium: boolean
    bonus: number
  }>
  maxBonus: number
  success: boolean
}

const transformReferals = (response: ReferalsResponse) => ({
  ...response,
  referals: response.referals.map((user) => ({
    id: user.userId,
    name: user.name ?? user.username ?? 'Not indicated',
    value: `+${formatNumber(user.bonus)} KKXP`,
  })),
});

const getReferals = {
  query: () => '/api/users/referals',
  transformResponse: transformReferals,
};

type Referals = ReturnType<typeof transformReferals>;

export {
  getReferals,
  type Referals,
};
