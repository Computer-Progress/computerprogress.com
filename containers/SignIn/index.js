import { useState, useEffect } from 'react';
import PageTemplate from "../../components/PageTemplate";
import Alert from "../../components/Alert";
import { useRouter } from 'next/router'
import { CircularProgress } from '@material-ui/core';
import {
  Container,
  StyledBox,
  InfoContainer,
  Input,
  Question,
  SignButton,
  Divider
} from './styles';

import useApi from '../../services/useApi';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as alertActions } from '../../store/ducks/alert';
import { Creators as userActions } from '../../store/ducks/user';

export default function SignIn() {
  const router = useRouter()
  const dispatch = useDispatch();
  const userState = useSelector(state => state.UserReducer);

  const api = useApi()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const onChange = (value, fieldName) => {
    let myInfo = userInfo;

    myInfo[fieldName] = value;
    setUserInfo(myInfo);
  }

  const getUserInfo = async () => {
    setLoading(true)
    try {
      const response = await api.get('/users/me')
      console.log(response)
      const user = response.data
      if (user?.email) {
        dispatch(userActions.login({...user, ...userState}))
        router.push('/')
      }
    
    } catch (error) {
      setLoading(false)
      dispatch(alertActions.openAlert({
        open: true,
        message: error.message,
        type: 'error'
      }));
    }

  }

  useEffect(() => {
    if (userState?.token) {
      getUserInfo()
    }
  }, [userState])

  const login = async () => {
    console.log(userInfo)
    const validations = ['email', 'password']
    const isInvalid = validations.some(item => {
      if (!userInfo[item]) {
        dispatch(alertActions.openAlert({
          open: true,
          message: `Please, insert the ${item}`,
          type: 'warning'
        }));
        return true;
      }
      return false;
    })

    console.log(userInfo)

    if (isInvalid) return
    setLoading(true)
    const { email, password } = userInfo
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await api.post('login/access-token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    
      console.log(response.data)
      const { data } = response 
      let user = {
        token: `${data.token_type} ${data.access_token}`
      }
      dispatch(userActions.login(user))
    } catch (error) {
      setLoading(false)
      dispatch(alertActions.openAlert({
        open: true,
        message: error.message,
        type: 'error'
      }));
    }
  


  }

  return (
    <PageTemplate>
      <Container>
        <InfoContainer>
          <h2>Your help can change everything</h2>
          <p>
            Collaborate for the understanding of hardware burden
            influence in machine learning.
          </p>
        </InfoContainer>
        <StyledBox>
          <h2>Sign In</h2>
          <Input label="Email" onChange={(event) => onChange(event.target.value, 'email')} />
          <Input label="Password" type="password" autoComplete="current-password" onChange={(event) => onChange(event.target.value, 'password')} />
          <Question >Forgot your password?</Question>
          <SignButton onClick={login}>{loading ? (
            <CircularProgress color='inherit' size={25} />
          ) : 'SIGN IN'}</SignButton>
          <Divider />
          <Question>Don't have an account?</Question>
          <SignButton variant="outlined">SIGN UP</SignButton>
        </StyledBox>
      </Container>
    </PageTemplate>
  )
}

