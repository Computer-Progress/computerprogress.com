export { default } from "../containers/Home";

export async function getServerSideProps() {
  const URL =
    process.env.BASE_API_URL + "/sota";

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
