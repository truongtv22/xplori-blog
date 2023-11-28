import { useQuery } from "react-query";

import { getListItemByCountry } from "@/services/api";

const GET_LIST_ITEMS_BY_COUNTRY = "GET_LIST_ITEM_BY_COUNTRY";

export const useGetListItemByCountry = (id) => {
  return useQuery(
    [GET_LIST_ITEMS_BY_COUNTRY, id],
    () => getListItemByCountry(id),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: !!id,
    }
  );
};
