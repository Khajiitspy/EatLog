import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";


export interface IUserItem {
    id: number;
    email: string;
    name: string;
    image?: string;
    roles: string[];
    "isLoginGoogle": false,
    "isLoginPassword": true,
}


export const adminService = createApi({
    reducerPath: "adminService",
    baseQuery: createBaseQuery("Users"),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => ({
                url: "/list",
                method: "GET",
            }),
            providesTags: ['Users'],
        }),

        searchUsers: builder.query<IUserItem[], string>({
            query: (name) => ({
                url: 'search',
                method: 'GET',
                params: { Name: name } // Додає ?Name=... до URL
            }),
            providesTags: ['Users'],
        }),

    }),
});

export const {
    useGetUsersQuery,
    useSearchUsersQuery
} = adminService;