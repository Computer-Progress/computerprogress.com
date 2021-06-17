import { Button } from "./styles.js";
import Link from "next/link";

export default function MyButton({ link, primary, children, ...props }) {
  if (link) {
    return (
      <div>
        <Link href={link || ""}>
          <Button primary={primary} {...props}>
            {children}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Button primary={primary} {...props}>
      {children}
    </Button>
  );
}
