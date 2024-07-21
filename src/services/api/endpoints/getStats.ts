interface StatsResponse {
  success: boolean
  count: number
}

const getStats = {
  query: () => '/api/users/stats',
};

export {
  type StatsResponse,
  getStats,
};
