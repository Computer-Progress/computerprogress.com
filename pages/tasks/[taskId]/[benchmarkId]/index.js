export { default } from "../../../../containers/Benchmark";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/benchmark/${query.benchmarkId}`
    );
    const benchmark = await res.json();

    return {
      props: {
        benchmark,
      },
    };
  } catch {
    if (query.hasOwnProperty("taskId")) {
      return {
        redirect: {
          permanent: false,
          destination: `/tasks/${query.taskId}`,
        },
        props: {},
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
};
