export { default } from "../../containers/Account";

export async function getStaticProps() {
  return {
    props: { pathname: "/papers/reviews" }, // will be passed to the page component as props
  };
}
