import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import { useRouter } from "next/router";
import { Creators as userActions } from "../store/ducks/user";
import { Creators as alertActions } from "../store/ducks/alert";
export default (serverSide) => {
  let user;
  let dispatch;
  if (serverSide) {
    const state = store.getState();
    user = state.UserReducer;
  } else {
    user = useSelector((state) => state.UserReducer);
    dispatch = useDispatch();
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  });

  api.interceptors.request.use(async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: user.token || "",
    },
  }));

  if (!serverSide) {
    const router = useRouter();
    api.interceptors.response.use(function (response) {
      if (response.status === 401) {
        router.replace("/signin");
        dispatch(userActions.logout());
        dispatch(
          alertActions.openAlert({
            open: true,
            message: "Please, login",
            type: "error",
          })
        );
      } else if (response.status === 403) {
        router.replace("/");
        dispatch(
          alertActions.openAlert({
            open: true,
            message: "Forbidden",
            type: "error",
          })
        );
      }
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    });
  }

  return api;
};
