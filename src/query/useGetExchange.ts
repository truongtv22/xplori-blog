import { useQuery } from "react-query";

import { getExchange } from "@/services/api";

const GET_EXCHANGE = "GET_EXCHANGE";

export const useGetExchange = () => {
  return useQuery([GET_EXCHANGE], () => getExchange(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
