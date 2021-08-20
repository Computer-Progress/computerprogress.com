import React from 'react';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { Creators as navigationActions } from '../../store/ducks/navigation'

const PrivatePage = Component => {
  const Auth = (props) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const userState = useSelector((state) => state.UserReducer);
    // If user is not logged in, return login component
    if (!userState.id) {
      dispatch(navigationActions.saveUrl(router.pathname))
      router.replace('/signin', {})
      return null
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivatePage;
