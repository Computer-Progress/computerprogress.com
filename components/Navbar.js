import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigation = [{ name: "About us", href: "/trends", current: false }];
  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const userNavigation = [
    {
      name: "The Computation Limits of Deep Learning",
      href: "/benchmarks/image-classification-on-imagenet",
    },
    {
      name: "Compute Trends Across Three Eras of Machine Learning",
      href: "/trends",
    },
  ];
  return (
    <Disclosure as="nav" className="bg-black border-b-[#70202f] border-b">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href={"/"}>
                    <h1 className="text-xl cursor-pointer font-bold text-white uppercase">
                      Computer Progress
                    </h1>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Profile dropdown */}
                  <Menu as="div" className=" relative">
                    <Menu.Button className="bg-[#000] text-white px-3 py-2 rounded-md text-sm font-medium">
                      Datasets
                      <span className="sr-only">Open user menu</span>
                    </Menu.Button>

                    <Menu.Items className="z-30 origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="bg-[#000] text-white px-3 py-2 rounded-md text-sm font-medium"
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#0004] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0004] focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Disclosure as="div" className="w-full" >
                <Disclosure.Button className="w-full text-left bg-[#000] text-white px-3 py-2 rounded-md text-sm font-medium">
                  Datasets
                  <span className="sr-only">Open user menu</span>
                </Disclosure.Button>

                <Disclosure.Panel className="">
                  {userNavigation.map((item) => (
                     <Disclosure.Button
                     key={item.name}
                     as="a"
                     href={item.href}
                     className="bg-[#000] text-white block pl-8 px-3 py-2 rounded-md text-sm font-medium"
                     aria-current={item.current ? "page" : undefined}
                   >
                     {item.name}
                   </Disclosure.Button>
                  ))}
                </Disclosure.Panel>
              </Disclosure>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="bg-[#000] text-white block px-3 py-2 rounded-md text-base font-medium"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
