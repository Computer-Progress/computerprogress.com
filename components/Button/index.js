import { StyledButton } from "./styles.js";
import Link from "next/link";

export default function Button({ href, children, ...props }) {
  return (
    <>
      {href ? (
        <Link href={href} passHref>
          <StyledButton {...props}>{children}</StyledButton>
        </Link>
      ) : (
        <StyledButton {...props}>{children}</StyledButton>
      )}
    </>
  );
}
