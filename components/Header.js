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
            appetite for computing power. This article catalogs the extent of
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
          <ul className="flex flex-row justify-start flex-wrap gap-x-16 gap-y-4">
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Paper
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Authors: Kristjan Greenewald, Keeheon Lee, and Gabriel Manso
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>{" "}
              Wired, VentureBeat, Discover, The Next Web, Interesting
              Engineering, Tech Gig
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
                      "text-[#AA3248] mt-1"
                    )}
                    key={item.range}
                  >
                    <Link href={'/benchmarks/' + item.range}>{item.dataset}</Link>
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
