
import UserPageTemplate from "../../components/UserPageTemplate";
import { MuiTheme } from "../../styles/theme";
import { Title } from "./styles";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Review() {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const userState = useSelector(state => state.UserReducer);

  useEffect(() => {
    console.log(userState)
  }, [userState])

  return (
    <UserPageTemplate selectedPage={0}>
      <Title>Profile</Title>
    </UserPageTemplate>
  );
}
