import {
  DocumentTextIcon,
  NewspaperIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export default function Header() {
  return (
    <header className=" bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Compute Trends Across Three Eras of Machine Learning
        </h1>
        <div className="flex gap-5 flex-col">
          <p className="mt-5 text-sm text-gray-600 text-justify">
            Compute, data, and algorithmic advances are the three fundamental
            factors that guide the progress of modern Machine Learning (ML). In
            this project we study trends in the most readily quantified factor -
            compute. We show that before 2010 training compute grew in line with
            Moore{"'"}s law, doubling roughly every 20 months. Since the advent of
            Deep Learning in the early 2010s, the scaling of training compute
            has accelerated, doubling approximately every 6 months. In late
            2015, a new trend emerged as firms developed large-scale ML models
            with 10 to 100-fold larger requirements in training compute. Based
            on these observations we split the history of compute in ML into
            three eras: the Pre Deep Learning Era, the Deep Learning Era and the
            Large-Scale Era. Overall, our work highlights the fast-growing
            compute requirements for training advanced ML systems.
          </p>
          <ul className="flex flex-row justify-start flex-wrap gap-x-16 gap-y-4">
            <li className="flex items-center text-sm text-gray-600 gap-1">
              <a
                href="https://arxiv.org/abs/2202.05924"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center text-sm text-gray-600 gap-1"
              >
                <DocumentTextIcon className="w-5 h-5" /> Paper
              </a>
            </li>
            <li className="flex items-center text-sm text-gray-600 gap-2">
              <UserGroupIcon className="w-5 h-5" /> Jaime Sevilla, Lennart Heim,
              Anson Ho, Tamay Besiroglu, Marius Hobbhahn, Pablo Villalobos
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
