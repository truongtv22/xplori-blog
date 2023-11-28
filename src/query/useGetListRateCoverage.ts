import { useQuery } from "react-query";
import { getRateCoverage } from "@/services/api";

export const GET_LIST_RATE_COVERAGE = "GET_LIST_RATE_COVERAGE";

export const useGetListRateCoverage = () => {
  return useQuery([GET_LIST_RATE_COVERAGE], () => getRateCoverage(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
