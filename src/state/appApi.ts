import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IUserLoginForm } from '../models/models';

// to make queries to our DB
const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<IUser, void>({
      query: () => ({ url: `users/all` }),
    }),
    getUserById: build.query<IUser, string>({
      query: (id: string) => ({
        url: `users/${id}`,
        params: {
          id,
        },
      }),
    }),
    signupUser: build.mutation({
      query: (user: IUser) => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: build.mutation({
      query: (user: IUserLoginForm) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
    logoutUser: build.mutation({
      query: (user: IUser) => ({
        url: '/users/logout',
        method: 'DELETE',
        body: user,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;
