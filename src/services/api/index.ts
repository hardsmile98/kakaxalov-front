import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { envs } from 'constants/index'
import tagTypes from './tagTypes'
import * as endpoints from './endpoints'

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envs.apiUrl,
    prepareHeaders (headers) {
      const tgData = localStorage.getItem('tgData')

      if (tgData !== null) {
        headers.set('X-Telegram-Data', tgData)
      }

      return headers
    },
    credentials: 'include'
  }),

  endpoints: (builder) => ({
    getProfile: builder.query<endpoints.ProfileResponse, undefined>(endpoints.getProfile),
    getTop100: builder.query(endpoints.getTop100),
    getTasks: builder.query<endpoints.TasksResponse, undefined>(endpoints.getTasks),
    completeTask: builder.mutation(endpoints.completeTask),
    getReferals: builder.query(endpoints.getReferals),
    getBoosts: builder.query(endpoints.getBoosts),
    improveBoost: builder.mutation(endpoints.improveBoost),
    applyBoost: builder.mutation(endpoints.applyBoost),
    startGame: builder.mutation(endpoints.startGame),
    endGame: builder.mutation(endpoints.endGame),
    checkEnergy: builder.query<endpoints.CheckEnergyResponse, undefined>(endpoints.checkEnergy)
  }),

  tagTypes: Object.values(tagTypes)
})

export const {
  useGetProfileQuery,
  useGetTop100Query,
  useGetTasksQuery,
  useCompleteTaskMutation,
  useGetReferalsQuery,
  useGetBoostsQuery,
  useImproveBoostMutation,
  useApplyBoostMutation,
  useStartGameMutation,
  useEndGameMutation,
  useCheckEnergyQuery
} = publicApi

export function isErrorWithMessage (
  error: unknown
): error is { data: { message: string } } {
  return (
    typeof error === 'object' &&
    error != null &&
    typeof (error as any).data?.message === 'string'
  )
}

export * from './endpoints'
