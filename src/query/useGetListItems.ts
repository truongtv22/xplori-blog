import { useQuery } from "react-query";

import { getListItems } from "@/services/api";
import { ListItemProps } from "@/types/ListItemProps";

const GET_LIST_ITEMS = "GET_LIST_ITEM";

export const useGetListItems = ({ product_type, popular, use_credit }: ListItemProps, listProduct) => {
  return useQuery(
    [GET_LIST_ITEMS, product_type],
    () => getListItems({ product_type, popular, use_credit }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      initialData: listProduct,
    }
  );
};
