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
    getMovies: builder.query({
      query: ({ year, sortBy, genre, rating, platform }) => {
        const params = new URLSearchParams({
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          watch_region: "US", // always filter by US providers
        });

        if (sortBy) params.append("sort_by", sortBy);
        if (rating) params.append("vote_average.gte", rating);
        if (year) params.append("year", year);

        // Only append genre if it's provided (non-empty)
        if (genre) params.append("with_genres", genre);

        // Only append platform if it's provided (non-empty)
        if (platform) params.append("with_watch_providers", platform);

        return `/discover/movie?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetTopRatedMoviesQuery,
  useGetTopRatedShowsQuery,
  useGetMoviesQuery,
} = tmdbApi;
