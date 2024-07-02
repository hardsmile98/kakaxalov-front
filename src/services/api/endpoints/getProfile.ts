import tagTypes from '../tagTypes';

interface ProfileResponse {
  success: boolean
  newUser: boolean
  user: {
    userId: number
    name: string
    username: string
    amountEnergy: number
    useEneryTimestamp: string
    recoveryEneryTimestamp: string
    energyRecoveryTimeSeconds: number
    gameTime: number
    score: number
    skin: string
    inviteCode: string
    refCode: string
  }
}

const getProfile = {
  query: () => '/api/users/profile',

  providesTags: [tagTypes.profile],
};

export {
  type ProfileResponse,
  getProfile,
};
