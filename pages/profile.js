export { default } from "../containers/Account";

export async function getStaticProps() {
  return {
    props: { pathname: "/profile" }, // will be passed to the page component as props
  };
}

// export const getServerSideProps = async ({ query }) => {
//   const api = useApi(true);
//   try {
//     const res = await api.get(`/users/me`);
//     const profile = res.data;

//     return {
//       props: {
//         profile,
//       },
//     };
//   } catch {
//     return {
//       props: {},
//     };
//   }
// };
