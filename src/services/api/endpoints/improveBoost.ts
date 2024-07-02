import tagTypes from '../tagTypes';

const improveBoost = {
  query: (boostId: number) => ({
    url: '/api/boosts/improve',
    method: 'POST',
    body: {
      boostId,
    },
  }),

  invalidatesTags: [tagTypes.profile, tagTypes.boosts],
};

export {
  improveBoost,
};
