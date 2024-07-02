interface GetNftBonusResponse {
  success: boolean
  bonus: number
}

const getNftBonus = {
  query: (walletStateInit: string | undefined) => ({
    url: '/api/users/nftBonus',
    params: {
      walletStateInit,
    },
  }),
};

export {
  type GetNftBonusResponse,
  getNftBonus,
};
