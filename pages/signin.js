import useApi from "../services/useApi";

export { default } from "../containers/SignIn";

async function GetServerSidePropsWithQueryConfirmation({ query }) {
  const api = useApi(true);

  const body = {
    token: query.confirmation,
  };

  let hasEmailConfirmationSucceed = null;

  try {
    await api.post(`/confirm-email`, body);

    hasEmailConfirmationSucceed = true;
  } catch (error) {
    // console.log(error);

    hasEmailConfirmationSucceed = false;
  }

  return {
    props: {
      hasEmailConfirmationSucceed,
    },
  };
}

export async function GetServerSideProps({ query }) {
  if (query.confirmation)
    return <GetServerSidePropsWithQueryConfirmation query={query} />;

  return {
    props: {},
  };
}
