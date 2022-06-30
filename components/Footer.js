import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <footer className=" bg-black/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-2">
          <div className="relative h-14 w-48">
            <Image src="/futuretech.svg" alt="future tech" layout="fill" />
          </div>
          <p className="text-gray-100 text-sm">© 2022 Computer Progress</p>
        </div>
      </div>

    </footer>
  );
}
