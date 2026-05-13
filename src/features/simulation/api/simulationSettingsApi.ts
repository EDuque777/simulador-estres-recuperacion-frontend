import { baseApi } from "@/shared/api/baseApi";
import type {
  SimulationParameters,
  SimulationSettingsResponse,
} from "../types/stressSimulation.types";

export const simulationSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSimulationSettings: builder.query<SimulationParameters, void>({
      query: () => "/simulation-settings",
      providesTags: ["SimulationSettings"],
    }),
    updateSimulationSettings: builder.mutation<
      SimulationSettingsResponse,
      SimulationParameters
    >({
      query: (body) => ({
        url: "/simulation-settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SimulationSettings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSimulationSettingsQuery,
  useUpdateSimulationSettingsMutation,
} = simulationSettingsApi;
