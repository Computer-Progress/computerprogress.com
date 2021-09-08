export { default } from "../../../containers/Task";
import useApi from "../../../services/useApi";

export const getServerSideProps = async ({ query }) => {
  const api = useApi(true);
  try {
    const res = await api.get(`/sota/${query.taskId}`);
    const benchmarks = res.data;

    return {
      props: {
        benchmarks,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};
