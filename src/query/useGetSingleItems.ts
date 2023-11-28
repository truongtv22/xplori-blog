import { useQuery } from "react-query";

import { getSingleItem } from "@/services/api";

export const GET_SINGLE_ITEM = "GET_SINGLE_ITEM";

export const useGetSingleItem = (id, product) => {
  return useQuery([GET_SINGLE_ITEM, id], () => getSingleItem(id), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!id,
    initialData: product,
  });
};
