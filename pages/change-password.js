import useApi from "../services/useApi";
export { default } from "../containers/ChangePassword";

export async function getServerSideProps({ query }) {
  if (query.token) {
    const api = useApi(true);

    try {
      //   await api.post(`/confirm-email`, { token: query.token });

      return {
        props: {
          token,
        },
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/signin",
        },
        props: {
          alert: {
            type: "error",
            message: "Invalid token",
          },
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/signin",
    },
  };
}
