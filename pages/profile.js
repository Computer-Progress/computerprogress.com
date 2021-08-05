export { default } from "../containers/Profile";
import useApi from "../services/useApi";

export const getServerSideProps = async ({ query }) => {
  const api = useApi(true);
  try {
    const res = await api.get(`/users/me`);
    const profile = res.data;
    console.log(profile);

    return {
      props: {
        profile,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};
