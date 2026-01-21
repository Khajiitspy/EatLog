import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type {ICartData} from "../types/cart/ICartData.ts";

export const cartService = createApi({
  reducerPath: "cartService",
  baseQuery: createBaseQuery("carts"),
  endpoints: (builder) => ({
    getCart: builder.query<ICartData, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCartQuery } = cartService;
