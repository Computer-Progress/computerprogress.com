export { default } from "../../../containers/Task";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`https://computerprogress.xyz/api/v1/sota/${query.taskId}`);
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
