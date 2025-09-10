import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../api/tmdbApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
