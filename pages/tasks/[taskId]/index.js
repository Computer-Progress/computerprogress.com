export { default } from "../../../containers/Task";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${query.taskId}`);
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
