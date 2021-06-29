export { default } from "../containers/Home";

export async function getServerSideProps() {
  const URL =
    "http://ec2-3-129-18-205.us-east-2.compute.amazonaws.com/api/v1/sota";

  try {
    const response = await fetch(URL);
    const tasks = await response.json();

    return {
      props: {
        tasks,
      },
    };
  } catch {
    return { props: {} };
  }
}
