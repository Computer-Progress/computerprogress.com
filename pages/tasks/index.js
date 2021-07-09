export { default } from "../../containers/Tasks";

export async function getServerSideProps() {
  const URL =
    "https://computerprogress.xyz/api/v1/tasks";

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
