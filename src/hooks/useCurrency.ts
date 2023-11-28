import get from "lodash.get";
import { useMemo } from "react";
import { useAtom } from "jotai";

import { currencyAtom } from "@/atom/currency";
import { useGetExchange } from "@/query/useGetExchange";

export const useCurrency = () => {
  const { data: dataExchange } = useGetExchange();
  const [currency] = useAtom(currencyAtom);

  const listCurrency = useMemo(() => {
    const data = [];
    const exchange = get(dataExchange, "data", []);
    data.push({
      name: "USD",
      rate: "1",
      symbol: "$",
    })
    exchange.forEach((item) => {
      data.push({
        name: item.name,
        rate: item.rate,
        symbol: item.name,
      });
    });
    return data;
  }, [dataExchange]);

  const currentCurrency = useMemo(() => {
    const data = listCurrency.find((item) => item.name === currency);
    return data || listCurrency[0];
  }, [currency, listCurrency]);

  const parseCurrency = (value) => {
    return (value * currentCurrency.rate).toFixed(2);
  };

  return { listCurrency, currentCurrency, parseCurrency };
};
