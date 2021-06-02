import { Button } from "./styles.js";
import Link from 'next/link'

export default function Navbar({link, primary, children, ...props}) {
    return (
      <div>
        <Link href={link || ""}>
            <Button primary={primary} {...props}>{children}</Button>
        </Link>
      </div>
    );
  }
