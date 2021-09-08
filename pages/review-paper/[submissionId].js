export { default } from "../../containers/ReviewPaper";
import useApi from "../../services/useApi";

export const getServerSideProps = async ({ query }) => {
  const api = useApi(true);
  try {
    const res = await api.get(`/submissions/${query.submissionId}`);
    const submission = res.data;
    return {
      props: {
        submission,
        submissionId: query.submissionId,
      },
    };
  } catch (error) {
    return {
      props: {
        submission: error.message,
        submissionId: query.submissionId,
      },
    };
  }
};
