import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzIwNDQ4NzI0NDM1MTY0NDdiOGQ4MzBmMThlNzI4ZSIsIm5iZiI6MTY2NzMzNDE2My4xNTY5OTk4LCJzdWIiOiI2MzYxODAxM2I4N2FlYzAwN2MyYmUxNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Hv0YPSc_nlsGy-9LYzKQfKTF8TfjS68WqG3vmVY1B5Q";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi", // unique key for the API
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${apiKey} `);
      headers.set("Accept", "application/json");
    },
  }),
  endpoints: (builder) => ({
    getTopRatedMovies: builder.query({
      query: () => "/movie/top_rated",
    }),
    getTopRatedShows: builder.query({
      query: () => "/tv/top_rated",
    }),
  }),
});

export const { useGetTopRatedMoviesQuery, useGetTopRatedShowsQuery } = tmdbApi;
