import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => '/articles'
        }),
    }),
});
