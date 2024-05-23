import tagTypes from '../tagTypes'

enum BoostSlugs {
  devourer = 'devourer',
  energy = 'energy'
}

interface BoostsResponse {
  boosts: Array<{
    allCount: number
    availableCount: number
    boostId: number
    canImproved: boolean
    description: string
    improveTitle: string
    id: number
    lastUseTimestamp: null | string
    level: number
    levelPrice: number
    maxLevel: number
    slug: BoostSlugs
    title: string
    userId: string
  }>
  success: boolean
}

const transformBoosts = (response: BoostsResponse) => {
  return {
    improveList: response.boosts
      .filter(boost => boost.canImproved)
      .map(boost => ({
        slug: boost.slug,
        title: boost.improveTitle,
        description: `${boost.levelPrice} KAKAX`,
        extra: `${boost.level !== boost.maxLevel ? boost.level + 1 : boost.level} LVL`,
        disabled: boost.maxLevel === boost.level
      }))
  }
}

const getBoosts = {
  query: () => '/api/boosts',

  transformResponse: transformBoosts,

  providesTags: [tagTypes.boosts]
}

type Boosts = ReturnType<typeof transformBoosts>

export {
  BoostSlugs,
  type Boosts,
  getBoosts
}