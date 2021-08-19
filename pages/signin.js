import useApi from "../services/useApi";

export { default } from "../containers/SignIn";

export async function getServerSideProps({ query }) {
  if (query.confirmation) {
    const api = useApi(true);

    const params = new URLSearchParams();
    params.append("confirmation_token", query.confirmation);

    let hasEmailConfirmationSucceed = null;

    try {
      // await api.put(`...`, params);

      hasEmailConfirmationSucceed = true;
    } catch (error) {
      console.log(error);

      hasEmailConfirmationSucceed = false;
    }

    return {
      props: {
        hasEmailConfirmationSucceed,
      },
    };
  }

  return {
    props: {},
  };
}
