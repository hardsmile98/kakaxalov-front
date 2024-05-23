import tagTypes from '../tagTypes'

const startGame = {
  query: () => ({
    url: '/api/game/start',
    method: 'POST'
  }),

  invalidatesTags: [tagTypes.profile]
}

export {
  startGame
}
