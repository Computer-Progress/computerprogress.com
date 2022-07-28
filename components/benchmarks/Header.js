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
  const benchmarksList = {};
  benchmarks.slice(1).forEach((element) => {
    if (!benchmarksList[element[0]]) {
      benchmarksList[element[0]] = [];
    }
    benchmarksList[element[0]].push({ dataset: element[1], range: element[2] });
  });
  const router = useRouter();

  return (
    <header className=" bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          The Computation Limits of Deep Learning
        </h1>
        <div className="flex gap-5 flex-col">
          <p className="mt-5 text-sm text-gray-600 text-justify">
            Deep learning{"'"}s recent history has been one of achievement: from
            triumphing over humans in the game of Go to world-leading
            performance in image classification, voice recognition, translation,
            and other tasks. But this progress has come with a voracious
            appetite for computing power. This project catalogs the extent of
            this dependency, showing that progress across a wide variety of
            applications is strongly reliant on increases in computing power.
            Extrapolating forward this reliance reveals that progress along
            current lines is rapidly becoming economically, technically, and
            environmentally unsustainable. Thus, continued progress in these
            applications will require dramatically more
            computationally-efficient methods, which will either have to come
            from changes to deep learning or from moving to other machine
            learning methods.
          </p>
          <ul className="flex flex-col sm:flex-row justify-start  gap-x-8 gap-y-4">
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <a
                href="https://arxiv.org/abs/2007.05558v2"
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
                Neil Thompson, Kristjan Greenewald, Keeheon Lee, and Gabriel
                Manso
              </p>
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <NewspaperIcon className="w-5 h-5" />
              <p className="whitespace-pre-wrap">
                <a
                  href="https://www.wired.com/story/prepare-artificial-intelligence-produce-less-wizardry/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Wired 
                </a>
                ,{' '}
                <a
                  href="https://venturebeat.com/2020/07/15/mit-researchers-warn-that-deep-learning-is-approaching-computational-limits/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  VentureBeat
                </a>
                ,{' '}
                <a
                  href="https://www.discovermagazine.com/technology/the-computational-limits-of-deep-learning-are-closer-than-you-think"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Discover
                </a>
                ,{' '}
                <a
                  href="https://thenextweb.com/neural/2020/07/17/ai-researchers-say-weve-squeezed-nearly-as-much-out-of-modern-computers-as-we-can/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  The Next Web
                </a>
                ,{' '}
                <a
                  href="https://interestingengineering.com/deep-learning-reaching-computational-limits-warns-new-mit-study"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Interesting Engineering
                </a>
                ,{' '}
                <a
                  href="https://content.techgig.com/mit-researchers-warn-that-deep-learning-is-reaching-its-computational-limit/articleshow/77033239.cms"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Tech Gig
                </a>
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-8 mb-4 border-2 bg-white py-8 rounded-lg">
          <h2 className=" text-2xl text-center font-bold text-gray-900">
            Benchmarks
          </h2>
          <div className=" mt-3 flex flex-wrap justify-around gap-8">
            {Object.entries(benchmarksList).map(([key, value]) => (
              <ul className="text-center" key={key}>
                <li className="text-gray-600 font-normal">{key}</li>
                {value.map((item) => (
                  <li
                    className={classNames(
                      item.range == router.query.slug ? "font-bold" : "",
                      "text-[#AA3248] mt-1 hover:underline"
                    )}
                    key={item.range}
                  >
                    <Link scroll={false} href={"/computation-limits-deep-learning/" + item.range}>
                      {item.dataset}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
