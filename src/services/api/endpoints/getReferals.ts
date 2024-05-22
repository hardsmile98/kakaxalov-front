import { formatNumber } from 'helpers/index'

interface ReferalsResponse {
  referals: Array<{
    userId: number
    name: string
    username: string
  }>
  success: boolean
}

const transformReferals = (response: ReferalsResponse) => {
  return response.referals.map(user => ({
    id: user.userId,
    name: user.name ?? user.username ?? 'Не указано',
    value: `+${formatNumber(100, { minimumFractionDigits: 0 })} KAKAX`
  }))
}

const getReferals = {
  query: () => '/api/users/referals',
  transformResponse: transformReferals
}

type Referals = ReturnType<typeof transformReferals>

export {
  getReferals,
  type Referals
}
