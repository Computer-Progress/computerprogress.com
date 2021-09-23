import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const PublicPageOnly = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const userState = useSelector((state) => state.UserReducer);

    if (userState.id) {
      router.replace("/");
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

export default PublicPageOnly;
