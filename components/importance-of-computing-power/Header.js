import {
  DocumentTextIcon,
  NewspaperIcon,
  PaperClipIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ benchmarks }) {
  const router = useRouter();

  return (
    <header className=" bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          The Importance of (Exponentially More) Computing Power
        </h1>
        <div className="flex gap-5 flex-col">
          <p className="mt-5 text-sm text-gray-600 text-justify">
            Denizens of Silicon Valley have called Moore{"'"}s Law {'"'}the most
            important graph in human history,{'"'} and economists have found
            that Moore{"'"}s Law-powered I.T. revolution has been one of the
            most important sources of national productivity growth. But data
            substantiating these claims tend to either be abstracted - for
            example by examining spending on I.T., rather than I.T. itself - or
            anecdotal. In this project, we assemble direct quantitative evidence
            of the impact that computing power has had on five domains: two
            computing bellwethers (Chess and Go), and three economically
            important applications (weather prediction, protein folding, and oil
            exploration). Computing power explains 49%-94% of the performance
            improvements in these domains. But whereas economic theory typically
            assumes a power-law relationship between inputs and outputs, we find
            that an exponential increase in computing power is needed to get
            linear improvements in these outcomes. This helps clarify why the
            exponential growth of computing power from Moore{"'"}s Law has been
            so important for progress, and why performance improvements across
            many domains are becoming economically tenuous as Moore{"'"}s Law
            breaks down.
          </p>
          <ul className="flex flex-col sm:flex-row justify-start  gap-x-8 gap-y-4">
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <a
                href="https://arxiv.org/abs/2206.14007"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center text-sm text-gray-600 gap-1"
              >
                <DocumentTextIcon className="w-5 h-5" /> Paper
              </a>
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <UserGroupIcon className="w-5 h-5" />{" "}
              <p className="whitespace-pre-wrap">
                Neil Thompson, Shuning Ge, and Gabriel Manso
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-8 mb-4 border-2 bg-white py-8 rounded-lg">
          <h2 className=" text-2xl text-center font-bold text-gray-900">
            Benchmarks
          </h2>
          <div className=" mt-3 flex flex-wrap justify-around gap-8">
            {benchmarks.map((item, index) => (
              <p
                key={index}
                className={classNames(
                  router.pathname.includes(item.range) ? "font-bold" : "",
                  "text-[#AA3248] mt-1 hover:underline"
                )}
              >
                <Link
                  scroll={false}
                  href={"/importance-of-computing-power/" + item.range}
                >
                  {item.name}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
