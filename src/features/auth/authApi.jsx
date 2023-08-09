import { apiSlice } from "../api/apiSlice";
import { setUser, updateUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/admins/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/admins/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data;
          dispatch(setUser(data));
          const tokenExpiration = 7 * 24 * 60 * 60 * 1000;
          const expireIn = Date.now() + tokenExpiration;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.data.token,
              admin: result.data.admin,
              expireIn,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    sendResetPasswordEmail: builder.mutation({
      query: (data) => ({
        url: "/admins/reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/admins/reset",
        method: "PATCH",
        body: data,
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ data, id, token, fileUrl }) => ({
        url: `/admins/update/${id}`,
        method: "PATCH",
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            const { data } = result?.data || {};
            dispatch(updateUser(data));
            const localAuth = localStorage?.getItem("auth");
            const auth = JSON.parse(localAuth);
            const { token, admin, expireIn } = auth || {};
            const newData = { ...admin, ...data };
            localStorage.setItem(
              "auth",
              JSON.stringify({
                token,
                admin: newData,
                expireIn,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendResetPasswordEmailMutation,
  useResetPasswordMutation,
  useUpdateAdminMutation,
} = authApi;
