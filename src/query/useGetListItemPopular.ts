import { useQuery } from "react-query";

import { getListItemPopular } from "@/services/api";

const GET_LIST_ITEM_POPULAR = "GET_LIST_ITEM_POPULAR";

export const useGetListItemPopular = () => {
  return useQuery([GET_LIST_ITEM_POPULAR], () => getListItemPopular(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
