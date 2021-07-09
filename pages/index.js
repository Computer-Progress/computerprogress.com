export { default } from "../containers/Home";

export async function getServerSideProps() {
  const URL =
    "https://computerprogress.xyz/api/v1/sota";

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
