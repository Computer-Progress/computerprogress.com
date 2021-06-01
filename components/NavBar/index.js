import { Wrapper, Logo, Menu, Auth } from "./styles.js";
import Button from "../Button";
export default function Navbar() {
  return (
    <div>
      <Wrapper>
        <Logo>Computer Progress</Logo>
        <Menu>
          <Button>Domains</Button>
          <Button>Dataset</Button>
          <Button>About us</Button>
        </Menu>
        <Auth>
          <Button>Sign up</Button>
          <Button primary>SIGN IN</Button>
        </Auth>
      </Wrapper>
    </div>
  );
}
