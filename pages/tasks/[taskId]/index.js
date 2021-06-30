export { default } from "../../../containers/Task";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`http://ec2-3-129-18-205.us-east-2.compute.amazonaws.com/api/v1/sota/${query.taskId}`);
    const benchmarks = await res.json();

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
