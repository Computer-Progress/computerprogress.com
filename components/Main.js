import { Disclosure, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Chart from "./Chart";

export default function Main({ benchmarks, dataset, accuracyTypes }) {
  const router = useRouter();
  const benchmark = benchmarks.find(
    (benchmark) => benchmark[2] === router.query.slug
  );

  // ============================================================

  const [yAxisOptions, setYAxisOptions] = useState([
    ...accuracyTypes.map((type) => ({
      name: type,
      column: type,
    })),
  ]);

  const [xAxisOptions, setXAxisOptions] = useState([
    {
      name: "Network Operations",
      column: "network_operations",
    },
    {
      name: "Hadware Burden",
      column: "hardware_burden",
    },
    {
      name: "Year",
      column: "year",
    },
  ]);

  const [xAxis, setXAxis] = useState(xAxisOptions[0]);
  const [yAxis, setYAxis] = useState(yAxisOptions[0]);

  const [showMore, setShowMore] = useState(false);
  //   ==============================================================

  const [filteredDataset, setFilteredDataset] = useState(dataset);

  // update yAxisOptions when benchmark changes
  useEffect(() => {
    console.log("benchmark changed");
    setYAxisOptions([
      ...accuracyTypes.map((type) => ({
        name: type,
        column: type,
      })),
    ]);
  }, [accuracyTypes]);

  // update yAxis and xAxis when yAxisOptions changes
  useEffect(() => {
    console.log("yAxisOptions changed");
    setYAxis(yAxisOptions[0]);
    setXAxis(xAxisOptions[0]);
  }, [yAxisOptions, xAxisOptions]);

  useEffect(() => {
    setFilteredDataset(
      dataset.filter((x) => x[xAxis.column] && x[yAxis.column])
    );
  }, [xAxis, yAxis, dataset]);

  //   ==============================================================

  return (
    <main>
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
        {/* Replace with your content */}
        <div>
          <h1 className="text-xl font-bold text-center text-gray-900">
            {benchmark[0]} <span className="font-normal">on</span>{" "}
            {benchmark[1]}
          </h1>
          <div className="grid grid-cols-[1fr_1fr_min-content_1fr_1fr] items-center gap-2 justify-center mt-5">
            <Menu
              as="div"
              className="col-start-2 place-self-end  relative inline-block text-left"
            >
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-opacity-75">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-light">Y axis</span>
                  <div className="flex items-center ">
                    <span className="text-md uppercase"> {yAxis.name}</span>
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Menu.Button>

              <Menu.Items className="z-10 absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {yAxisOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setYAxis(option);
                          }}
                          className={`${
                            active ? "bg-[#AA3248] text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md uppercase px-2 py-2 text-sm`}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
            <p className="place-self-center">vs.</p>
            <Menu
              as="div"
              className="place-self-start relative inline-block text-left"
            >
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-opacity-75">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-light">X axis</span>
                  <div className="flex items-center ">
                    <span className="text-md uppercase"> {xAxis.name}</span>
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Menu.Button>

              <Menu.Items className="z-10 absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {xAxisOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setXAxis(option);
                          }}
                          className={`${
                            active ? "bg-[#AA3248] text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md uppercase px-2 py-2 text-sm`}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
            {/* <div className="h-full place-self-end grid place-content-center">
              <button className="bg-[#AA3248] flex gap-1 text-sm text-white px-3 py-2 rounded-lg focus:ring-2 outline-none  focus:ring-[#AA3248] ring-offset-1 ring-opacity-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download data
              </button>
            </div> */}
          </div>
          <div>
            <Chart dataset={filteredDataset} xAxis={xAxis} yAxis={yAxis} />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Model name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {yAxis.name}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {xAxis.name}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(showMore
                  ? filteredDataset
                  : filteredDataset.slice(0, 10)
                ).map((data, index) => (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <tr className="border-b  dark:border-gray-700  bg-gray-50  ">
                          <th
                            scope="row"
                            className="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-pre-wrap"
                          >
                            {data["name"]}
                          </th>
                          <td className="px-6 py-2">{data["year"]}</td>
                          <td className="px-6 py-2">{data[yAxis.column]}</td>
                          <td className="px-6 py-2">{data[xAxis.column]}</td>
                          <td className="px-6 py-2 text-right">
                            <Disclosure.Button className="py-2">
                              {open ? (
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
                                    d="M18 12H6"
                                  />
                                </svg>
                              ) : (
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
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                              )}
                            </Disclosure.Button>
                          </td>
                        </tr>

                        <Disclosure.Panel as="tr" className="   bg-white  ">
                          <td colSpan="5">
                            <div className="border-x-[#AA3248] border-x-2 p-2 sm:grid sm:grid-cols-2 gap-5">
                              <div>
                                <h2>Paper</h2>
                                <div className="mt-1">
                                  <div>
                                    <p className="text-xs">Title</p>
                                    <p className="text-gray-900 flex gap-1">
                                      <span className="whitespace-pre-wrap">
                                        {data["title"]}
                                      </span>
                                      <a
                                        className="text-[#AA3248]"
                                        title="paper link"
                                        href={data["paper_link"]}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </a>
                                      <a
                                        className="text-[#21cbce]"
                                        title="paper with code"
                                        href={
                                          "https://paperswithcode.com" +
                                          data["paper_with_code"]
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512"
                                          className="h-5 w-5"
                                          fill="currentColor"
                                        >
                                          <path d="M88 128h48v256H88zm144 0h48v256h-48zm-72 16h48v224h-48zm144 0h48v224h-48zm72-16h48v256h-48z"></path>
                                          <path d="M104 104V56H16v400h88v-48H64V104zm304-48v48h40v304h-40v48h88V56z"></path>
                                        </svg>
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h2>Peformance metrics</h2>
                                <div className="flex gap-5 mt-1">
                                  {accuracyTypes.map((metric, index) => (
                                    <div key={index}>
                                      <p className="text-xs">{metric}</p>
                                      <p className="text-gray-900">
                                        {data[metric] || "-"}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h2>Computing power</h2>
                                <div className="flex gap-5 mt-1">
                                  <div>
                                    <p className="text-xs">
                                      Operations per network pass (FLOPS)
                                    </p>
                                    <p className="text-gray-900">
                                      {data["flops"] ||
                                        data["multiadds"] * 2 ||
                                        "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs">Hadware burden</p>
                                    <p className="text-gray-900">
                                      {data["hardware_burden"] || "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs">
                                      Network operations
                                    </p>
                                    <p className="text-gray-900">
                                      {data["network_operations"] || "-"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h2>Hardware</h2>
                                <div className="flex gap-5 mt-1">
                                  <div>
                                    <p className="text-xs">CPU</p>
                                    <p className="text-gray-900">
                                      {data["pretraining_cpu_model"] ||
                                        data["training_cpu_model"] ||
                                        data["finetuning_cpu_model"] ||
                                        "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs">TPU</p>
                                    <p className="text-gray-900">
                                      {data["pretraining_tpu_model"] ||
                                        data["training_tpu_model"] ||
                                        data["finetuning_tpu_model"] ||
                                        "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs">GPU</p>
                                    <p className="text-gray-900">
                                      {data["pretraining_gpu_model"] ||
                                        data["training_gpu_model"] ||
                                        data["finetuning_gpu_model"] ||
                                        "-"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right p-1 ">
            <p className="text-sm text-gray-600">
              {" "}
              Showing{" "}
              {filteredDataset.length <= 10 || showMore
                ? filteredDataset.length
                : 10}{" "}
              of {filteredDataset.length}
            </p>
          </div>
          {filteredDataset.length > 10 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-gray-100 flex gap-1 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 outline-none  focus:ring-gray-100 ring-offset-1 ring-opacity-25"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
        {/* /End replace */}
      </div>
    </main>
  );
}
