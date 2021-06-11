import { Wrapper, Logo, Menu, Auth, LogoName } from "./styles.js";
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
          <Button link='/about_us'>About Us</Button>
        </Menu>
        <Auth>
          <Button link='/sign_up'>Sign up</Button>
          <Button link='/sign_in' primary>SIGN IN</Button>
        </Auth>
      </Wrapper>
    </div>
  );
}
