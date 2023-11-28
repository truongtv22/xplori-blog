import { atomWithStorage } from "jotai/utils";

export const favouriteItemAtom = atomWithStorage("favouriteItems", []);