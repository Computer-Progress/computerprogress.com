import useApi from "../services/useApi";
export { default } from "../containers/ResetPassword";

export async function getServerSideProps({ query }) {
  return { props: { token: query.token } };
}
