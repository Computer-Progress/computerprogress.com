import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { StyledContainer } from "./styles";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <StyledContainer>{children}</StyledContainer>
      {/* <Footer /> */}
    </>
  );
}
