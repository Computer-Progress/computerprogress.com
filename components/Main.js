import { Disclosure, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";
import { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chart from "./Chart";

const Tooltip = ({ children, position }) => {
  const [popoverShow, setPopoverShow] = useState(false);
  const pos = position || "bottom-left";
  const openTooltip = () => {
    setPopoverShow(true);
  };
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center relative">
          <InformationCircleIcon
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            className="w-4 h-4 "
          />
          <div
            className={
              (pos.includes('right') ? " -left-3/4 " : " -right-3/4 ") +
              (pos.includes('top') ? " bottom-full " : " top-full ") +
              (popoverShow ? "" : "hidden ") +
              "absolute rounded-lg bg-black bg-opacity-70  z-50 font-normal leading-normal w-max max-w-xs text-sm  break-words "
            }
          >
            <div className="text-white p-2 normal-case">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
      name: "Hadware Burden",
      column: "computing_power",
    },
    {
      name: "Year",
      column: "year",
    },
  ]);

  const [xAxis, setXAxis] = useState(xAxisOptions[0]);
  const [yAxis, setYAxis] = useState(yAxisOptions[0]);
  const [sortBy, setSortBy] = useState(yAxisOptions[0]);

  const [showMore, setShowMore] = useState(false);
  //   ==============================================================

  const [filteredDataset, setFilteredDataset] = useState(dataset);

  // update yAxisOptions when benchmark changes
  useEffect(() => {
    setYAxisOptions([
      ...accuracyTypes.map((type) => ({
        name: type,
        column: type,
      })),
    ]);
  }, [accuracyTypes]);

  // update yAxis and xAxis when yAxisOptions changes
  useEffect(() => {
    setYAxis(yAxisOptions[0]);
    setXAxis(xAxisOptions[0]);
  }, [yAxisOptions, xAxisOptions]);

  useEffect(() => {
    setFilteredDataset(
      dataset
        .filter((x) => x[xAxis.column] && x[yAxis.column])
        .sort((a, b) => {
          return b[xAxis.column] - a[xAxis.column];
        })
    );
  }, [xAxis, yAxis, dataset]);

  useEffect(() => {
    setSortBy({ column: yAxis.column, type: "desc" });
  }, [yAxis]);

  function requestSort(column) {
    setSortBy({
      column,
      type: sortBy.type === "asc" && sortBy.column === column ? "desc" : "asc",
    });
    setFilteredDataset(
      dataset
        .filter((x) => x[xAxis.column] && x[yAxis.column])
        .sort((a, b) => {
          if (a[column].toLowerCase() < b[column].toLowerCase()) {
            return sortBy.type === "asc" ? 1 : -1;
          }
          if (a[column].toLowerCase() > b[column].toLowerCase()) {
            return sortBy.type === "asc" ? -1 : 1;
          }
          return 0;
        })
    );
  }
  // ==============================================================
  function downloadCSV() {
    var array = typeof dataset != "object" ? JSON.parse(dataset) : dataset;
    var str = "";
    var line = "";
    for (var index of Object.keys(array[0])) {
      if (line != "") line += ",";

      line += index;
    }
    str += line + "\r\n";

    for (var i = 0; i < array.length; i++) {
      line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    const blob = new Blob([str], { type: "data:text/csv;charset=utf-8," });
    const blobURL = window.URL.createObjectURL(blob);

    // Create new tag for download file
    const anchor = document.createElement("a");
    anchor.download = `${benchmark[0]} on ${benchmark[1]}.csv`;
    anchor.href = blobURL;
    anchor.dataset.downloadurl = [
      "text/csv",
      anchor.download,
      anchor.href,
    ].join(":");
    anchor.click();

    // Remove URL.createObjectURL. The browser should not save the reference to the file.
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      URL.revokeObjectURL(blobURL);
    }, 100);
  }

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
                      className="ml-2 -mr-1 h-5 w-5 text-gray-400"
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
                      className="ml-2 -mr-1 h-5 w-5 text-gray-400"
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
          </div>
          <div>
            <Chart
              dataset={filteredDataset}
              xAxis={xAxis}
              yAxis={yAxis}
              downloadCSV={downloadCSV}
            />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs table-fixed text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 w-2/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("name")}
                    >
                      <p>Model</p>
                      {sortBy.column === "name" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("year")}
                    >
                      <p>year</p>
                      {sortBy.column === "year" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort(yAxis.column)}
                    >
                      <p>{yAxis.name}</p>
                      {sortBy.column === yAxis.column &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>

                  <th scope="col" className="px-6 py-3 w-1/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("computing_power")}
                    >
                      <div className="flex gap-1">
                        hardware burden
                          <Tooltip position="bottom-left"> Something about hardware burden. Something about hardware burden. Something about hardware burden sdasd asdasd</Tooltip>
                      </div>
                      {sortBy.column === "computing_power" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    <button
                    className="flex items-center uppercase gap-2"
                      onClick={() => requestSort(xAxis.column)}
                    >
                      <p>{xAxis.name}</p>
                      {sortBy.column === xAxis.column &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th> */}
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
                        <tr className="border-b   bg-gray-50  ">
                          <th
                            scope="row"
                            className="px-6 py-2 font-medium text-gray-900 whitespace-pre-wrap"
                          >
                            {data["name"]}
                          </th>
                          <td className="px-6 py-2">{data["year"]}</td>

                          <td className="px-6 py-2">{data[yAxis.column]}</td>
                          <td className="px-6 py-2">
                            {data["computing_power"]}
                          </td>
                          {/* <td className="px-6 py-2">{data[xAxis.column]}</td> */}
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
                            <div className="border-x-[#AA3248] border-x-2 p-6 sm:grid sm:grid-cols-2 gap-8">
                              <div>
                                <h2 className="font-bold">Paper</h2>
                                <div className="flex gap-8 mt-1">
                                  <div>
                                    <p className="text-xs">Title</p>
                                    <p className="text-gray-900 flex gap-1">
                                      <a
                                        className="text-[#AA3248] hover:underline"
                                        title="paper link"
                                        href={data["paper_link"]}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <span className="whitespace-pre-wrap">
                                          {data["title"]}
                                        </span>
                                      </a>
                                    </p>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                              <div>
                                <h2 className="font-bold">External links</h2>

                                <p className="text-[#21cbce]">
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
                                    </svg>{" "}
                                  </a>
                                </p>
                              </div>

                              <div>
                                <h2 className="font-bold">
                                  Model Characteristics
                                </h2>

                                <div className="flex gap-5 mt-1">
                                  <div>
                                    <p className="text-xs flex gap-1">
                                      Operations per network pass
                                      <Tooltip position="bottom-right"> Something about hardware burden. Something about hardware burden. Something about hardware burden sdasd asdasd</Tooltip>

                                    </p>
                                    <p className="text-gray-900">
                                      {data["flops"] ||
                                        data["multiadds"] * 2 ||
                                        "-"}
                                      {(data["flops"] || data["multiadds"]) &&
                                        " FLOPS"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs">Paramenters</p>
                                    <p className="text-gray-900">
                                      {data["parameters"] || "-"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h2 className="font-bold">
                                  Peformance metrics
                                </h2>
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

          {filteredDataset.length > 10 && (
            <div className="flex items-center mt-8 justify-center">
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
