import { Wrapper, Logo, Menu, Auth, LogoName, SignInButton} from "./styles.js";
import LogoIcon from "../../public/logo_icon.svg";
import Button from "../Button";

export default function Navbar({ transparentBackground }) {
  return (
    <div>
      <Wrapper transparentBackground={transparentBackground}>
        <Logo link='/'>
          <LogoIcon />
          <LogoName>Computer Progress</LogoName>
        </Logo>
        <Menu>
          <Button link='/tasks'>Tasks</Button>
          <Button link='/aboutus'>About Us</Button>
        </Menu>
        <Auth>
          <Button link='/signup'>Sign up</Button>
          <SignInButton link='/signin' primary>SIGN IN</SignInButton>
        </Auth>
      </Wrapper>
    </div>
  );
}
