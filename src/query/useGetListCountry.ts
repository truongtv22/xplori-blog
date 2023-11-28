import { useQuery } from "react-query";

import { getListCountry } from "@/services/api";

const GET_LIST_COUNTRY = "GET_LIST_COUNTRY";

export const useGetListCountry = () => {
  return useQuery([GET_LIST_COUNTRY], () => getListCountry(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
