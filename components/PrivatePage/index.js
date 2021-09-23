import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Creators as navigationActions } from "../../store/ducks/navigation";
import { Creators as alertActions } from "../../store/ducks/alert";

const PrivatePage = (Component, role) => {
  const Auth = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userState = useSelector((state) => state.UserReducer);
    // If user is not logged in, return login component
    if (role && userState?.role && userState.role === "default") {
      router.replace("/");
      dispatch(
        alertActions.openAlert({
          message: "You are not allowed to access this page",
          open: true,
          type: "info",
        })
      );
      return null;
    }

    if (!userState.id) {
      dispatch(navigationActions.saveUrl(router.pathname));
      router.replace("/signin");
      return null;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivatePage;
