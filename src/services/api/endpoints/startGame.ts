import tagTypes from '../tagTypes';

const startGame = {
  query: ({ boostId }: { boostId?: number }) => ({
    url: '/api/game/start',
    method: 'POST',
    body: {
      boostId,
    },
  }),

  invalidatesTags: [tagTypes.profile, tagTypes.boosts],
};

export {
  startGame,
};
