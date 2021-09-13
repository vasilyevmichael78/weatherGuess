import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherResponseInterface } from "../../types/WeatherTypes";
import {RootState} from "../../app/store";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "3fdc62018cc31413e91b5c7f01ad24fb";
export const apiWeatherSlice = createApi({
  reducerPath: "api-weather",
  baseQuery: fetchBaseQuery({
    baseUrl,

    mode: "cors",
  }),

  endpoints: (builder) => ({
    getTemp: builder.query<WeatherResponseInterface, string | null>({
      query: (cityName = "London") => `?q=${cityName}&appid=${apiKey}`,
    }),
  }),
});

export const { useGetTempQuery } = apiWeatherSlice;
