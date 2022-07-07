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
          Parameter, Compute and Data Trends in Machine Learning
        </h1>
        <div className="flex gap-5 flex-col">
          <p className="mt-5 text-sm text-gray-600 text-justify">
            We have collected a dataset and analysed key trends in the training
            compute of Machine Learning models since 1950. We identify three
            major eras of training compute - the pre-Deep Learning Era, the Deep
            Learning Era, and the Large-Scale Era. Furthermore, we find that the
            training compute has grown by a factor of 10 billion since 2010,
            with a doubling rate of around 5-6 months.
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
