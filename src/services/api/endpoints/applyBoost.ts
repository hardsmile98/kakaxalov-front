import tagTypes from '../tagTypes'

const applyBoost = {
  query: (boostId: number) => ({
    url: '/api/boosts/apply',
    method: 'POST',
    body: {
      boostId
    }
  }),

  invalidatesTags: [tagTypes.profile, tagTypes.boosts]
}

export {
  applyBoost
}
