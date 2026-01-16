import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type { IRecipeItem } from "../types/recipe/IRecipeItem";

export const recipeService = createApi({
  reducerPath: "recipeService",
  baseQuery: createBaseQuery("recipes"),
  tagTypes: ["Recipe"],

  endpoints: (builder) => ({
    getRecipes: builder.query<IRecipeItem[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
} = recipeService;
