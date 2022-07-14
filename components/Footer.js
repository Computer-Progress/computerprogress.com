import { MailIcon } from "@heroicons/react/outline";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ transparent }) {
  return (
    <footer
      className={
        transparent ? " bg-black/50" : "bg-black border-t border-t-[#70202f]"
      }
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-2">
          <div className="relative h-12 m-2 w-48">
            <a
              href="https://futuretech.mit.edu/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/futuretech.svg" alt="future tech" layout="fill" />
            </a>
          </div>
          <p className="text-gray-100 text-sm items-end justify-center flex flex-col gap-2 ">
             © 2022 Computer Progress
            <a className="flex items-center gap-1"  href="mailto:hello@computerprogress.org">
            <MailIcon  strokeWidth="1" className="w-4 h-4" /> hello@computerprogress.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
