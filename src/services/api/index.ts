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
    getProfile: builder.query(endpoints.getProfile),
    getTop100: builder.query(endpoints.getTop100),
    getTasks: builder.query<endpoints.TasksResponse, undefined>(endpoints.getTasks),
    completeTask: builder.mutation(endpoints.completeTask),
    getReferals: builder.query(endpoints.getReferals),
    getBoosts: builder.query(endpoints.getBoosts),
    improveBoost: builder.mutation(endpoints.improveBoost)
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
  useImproveBoostMutation
} = publicApi

export * from './endpoints'
