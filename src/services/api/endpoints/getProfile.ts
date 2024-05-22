import tagTypes from '../tagTypes'

const getProfile = {
  query: () => '/api/users/profile',

  providesTags: [tagTypes.profile]
}

export {
  getProfile
}
