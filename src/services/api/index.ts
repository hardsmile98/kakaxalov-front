import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { envs } from 'constants/index';
import { prepareHeaders } from 'helpers/index';
import tagTypes from './tagTypes';
import * as endpoints from './endpoints';

const baseQuery: BaseQueryFn = (...baseQueryArgs) => {
  const [args] = baseQueryArgs;

  const url: string = args.url || args;

  return fetchBaseQuery({
    baseUrl: envs.apiUrl,
    prepareHeaders: (
      headers: Headers,
      api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
      >,
    ) => prepareHeaders({
      prepareHeadersArgs: {
        api,
        headers,
      },
      url,
    }),
    credentials: 'include',
  })(...baseQueryArgs);
};

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery,

  endpoints: (builder) => ({
    getProfile: builder.query<endpoints.ProfileResponse, undefined>(
      endpoints.getProfile,
    ),
    getLeadboard: builder.query(endpoints.getLeadboard),
    getTasks: builder.query<endpoints.Tasks, undefined>(endpoints.getTasks),
    getStats: builder.query<endpoints.StatsResponse, undefined>(
      endpoints.getStats,
    ),
    completeTask: builder.mutation(endpoints.completeTask),
    getReferals: builder.query(endpoints.getReferals),
    getBoosts: builder.query(endpoints.getBoosts),
    improveBoost: builder.mutation(endpoints.improveBoost),
    applyBoost: builder.mutation(endpoints.applyBoost),
    startGame: builder.mutation(endpoints.startGame),
    endGame: builder.mutation(endpoints.endGame),
    checkEnergy: builder.query<endpoints.CheckEnergyResponse, undefined>(
      endpoints.checkEnergy,
    ),
    getNftBonus: builder.query<
    endpoints.GetNftBonusResponse,
    string | undefined
    >(endpoints.getNftBonus),
  }),

  tagTypes: Object.values(tagTypes),
});

export const {
  useGetProfileQuery,
  useGetLeadboardQuery,
  useGetTasksQuery,
  useCompleteTaskMutation,
  useGetReferalsQuery,
  useGetBoostsQuery,
  useImproveBoostMutation,
  useApplyBoostMutation,
  useStartGameMutation,
  useEndGameMutation,
  useCheckEnergyQuery,
  useGetNftBonusQuery,
  useGetStatsQuery,
} = publicApi;

export function isErrorWithMessage(
  error: unknown,
): error is { data: { message: string } } {
  return (
    typeof error === 'object'
    && error != null
    && typeof (error as any).data?.message === 'string'
  );
}

export * from './endpoints';
