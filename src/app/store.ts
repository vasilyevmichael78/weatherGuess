import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../feature-slices/counter/counter-slice";
import { apiWeatherSlice } from "../feature-slices/api/weather-api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    [apiWeatherSlice.reducerPath]: apiWeatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(

      apiWeatherSlice.middleware
    ),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
