import { Wrapper, Copyright, SupportEmail} from "./styles.js";

export default function Footer({}) {

  return (
    <Wrapper>
      <SupportEmail> 
          Need something? &ensp;
          <a href="mailto:hello@computerprogress.org">
            hello@computerprogress.org
          </a>
      </SupportEmail>
     
      <Copyright>© 2021 Computer Progress</Copyright>
    </Wrapper>
  )
}