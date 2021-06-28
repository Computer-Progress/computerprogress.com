export { default } from "../../../../containers/Benchmark";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      `http://ec2-3-129-18-205.us-east-2.compute.amazonaws.com/api/v1/models/${query.taskId}/${query.benchmarkId}`
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
