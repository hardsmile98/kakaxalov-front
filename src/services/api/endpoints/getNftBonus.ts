interface GetNftBonusResponse {
  success: boolean
  bonus: number
}

const getNftBonus = {
  query: (address: string | undefined) => ({
    url: '/api/users/nftBonus',
    params: {
      address,
    },
  }),
};

export {
  type GetNftBonusResponse,
  getNftBonus,
};
