interface CheckEnergyResponse {
  success: boolean
  recovery: boolean
}

const checkEnergy = {
  query: () => '/api/users/checkEnergy',
};

export {
  type CheckEnergyResponse,
  checkEnergy,
};
