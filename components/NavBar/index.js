import { Wrapper, Logo, Menu, Auth } from "./styles.js";
import Button from "../Button";

export default function Navbar() {
  return (
    <div>
      <Wrapper>
      <Logo link='/'>Computer Progress</Logo>
        <Menu>
          <Button link='/domains'>Domains</Button>
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
