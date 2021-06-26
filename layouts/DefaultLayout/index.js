import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Container } from "@material-ui/core";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
