import axios from "axios";

import { ListItemProps } from "@/types/ListItemProps";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getListItems = ({ product_type, popular, use_credit }: ListItemProps) => {
  return api.get("/v2/items/", {
    params: {
      product_type,
      popular,
      use_credit,
    },
  })
};

export const getListItemByCountry = (id) => {
  return api.get(`/v2/items/${id}/country/`);
};

export const getListCountry = () => {
  return api.get("/v2/items/countries/");
};

export const getSingleItem = (id) => {
  return api.get(`/v2/items/${id}/`);
};

export const getListItemPopular = () => {
  return api.get("/v2/items/popular/");
};

export const getListCountryItems = (search, country, web_active) => {
  return api.get(`/v2/items/`, {
    params: {
      search,
      country,
      web_active,
    },
  });
};

export const postDataCheckout = (data) => {
  return api.post("/v2/order/", data);
};

export const postDataCheckoutFlexibleCredit = (data) => {
  return api.post("/v2/order/price/", data);
};

export const getRateCoverage = () => {
  return api.get("/rate/");
};

export const checkDiscountCode = (data) => {
  return api.post("/v2/order/check/", data);
};

export const getExchange = () => {
  return api.get("/exchange/");
};

export const getLocaleTrans = async (locale) => {
  try {
    const res = await api.get(`/trans/?country=${locale}`);
    return res.data[0].data;
  } catch (error) {
    return {};
  }
};

export const getDeliveryRate = async () => {
  try {
    const res = await api.get('/deli-rate/');
    return res.data;
  } catch (error) {
    return {};
  }
};
