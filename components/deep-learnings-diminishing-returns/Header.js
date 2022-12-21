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
          Deep Learning{"'"}s Diminishing Returns: The Cost of Improvement is
          Becoming Unsustainable
        </h1>
        <div className="flex gap-5 flex-col">
          <p className="mt-5 text-sm text-gray-600 text-justify">
            Deep learning is now being used to translate between languages,
            predict how proteins fold, analyze medical scans, and play games as
            complex as Go, to name just a few applications of a technique that
            is now becoming pervasive. Success in those and other realms has
            brought this machine-learning technique from obscurity in the early
            2000s to dominance today. • Although deep learning{"'"}s rise to
            fame is relatively recent, its origins are not. In 1958, back when
            mainframe computers filled rooms and ran on vacuum tubes, knowledge
            of the interconnections between neurons in the brain inspired Frank
            Rosenblatt at Cornell to design the first artificial neural network,
            which he presciently described as a “pattern-recognizing device.”
            But Rosenblatt{"'"}s ambitions outpaced the capabilities of his
            era—and he knew it. Even his inaugural paper was forced to
            acknowledge the voracious appetite of neural networks for
            computational power, bemoaning that “as the number of connections in
            the network increases…the burden on a conventional digital computer
            soon becomes excessive.” • Fortunately for such artificial neural
            networks—later rechristened “deep learning” when they included extra
            layers of neurons—decades of Moore{"'"}s Law and other improvements
            in computer hardware yielded a roughly 10-million-fold increase in
            the number of computations that a computer could do in a second. So
            when researchers returned to deep learning in the late 2000s, they
            wielded tools equal to the challenge.
          </p>
          <ul className="flex flex-col sm:flex-row justify-start  gap-x-8 gap-y-4">
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <a
                href="https://spectrum.ieee.org/deep-learning-computational-cost"
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
          </ul>
        </div>
      </div>
    </header>
  );
}
