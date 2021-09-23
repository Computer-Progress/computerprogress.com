export { default } from "../../../../containers/Benchmark";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_API_URL +
        `/models/${query.taskId}/${query.benchmarkId}`
    );
    const benchmark = await res.json();

    return {
      props: {
        benchmark,
        taskId: query.taskId,
        benchmarkId: query.benchmarkId,
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
