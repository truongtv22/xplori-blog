import { useQuery } from "react-query";
import { getListCountryItems } from "@/services/api";

const GET_LIST_COUNTRY_ITEMS = "GET_LIST_COUNTRY_ITEMS";
export const useGetListCountryItems = (search, country, web_active) => {
  return useQuery(
    [GET_LIST_COUNTRY_ITEMS, search, country, web_active],
    () => getListCountryItems(search, country, web_active),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
