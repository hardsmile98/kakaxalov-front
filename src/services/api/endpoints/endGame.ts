import tagTypes from '../tagTypes'

interface EndGameDto {
  id: number
  hash: string
  score: number
}

const endGame = {
  query: (dto: EndGameDto) => ({
    url: '/api/game/end',
    method: 'POST',
    body: dto
  }),

  invalidatesTags: [tagTypes.profile, tagTypes.leadboard]
}

export {
  endGame
}
