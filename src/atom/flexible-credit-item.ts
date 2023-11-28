import { atomWithStorage } from "jotai/utils";

export const flexibleCreditItemAtom = atomWithStorage("flexible-credit-item", {
  id: 0,
  banner: {},
  country: "",
  name: "",
  created_time: "",
  updated_time: "",
  price: 0,
  data: 0,
  duration: 0,
  currency: "US$",
  plan_type: "default",
  base_price: 0.0,
  additional_credit: 0.0,
  order: 0,
  height: null,
  width: null,
  quantity: 0,
});
