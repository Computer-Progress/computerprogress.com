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
import * as XLSX from "xlsx/xlsx.mjs";

export default function Main({ dataset, accuracyTypes }) {
  const router = useRouter();
  const benchmark = {
    name: "Oil Exploration",
    range: "oil-exploration",
  }

  // ============================================================

  const [yAxisOptions, setYAxisOptions] = useState([
    {
      name: "Computing Power",
      column: "GFLOPS",
    },
    {
      name: "SUCCESS RATE",
      column: "SUCCESS RATE",
    },
  ]);

  const [xAxisOptions, setXAxisOptions] = useState([
    {
      name: "Year",
      column: "YEAR",
    },
    {
      name: "Computing Power",
      column: "GFLOPS",
    },
  ]);

  const [xAxis, setXAxis] = useState(xAxisOptions[0]);
  const [yAxis, setYAxis] = useState(yAxisOptions[0]);
const [sortBy, setSortBy] = useState({
    name: "Year",
    column: "YEAR",
  });

  const [showMore, setShowMore] = useState(false);
  //   ==============================================================

  const [filteredDataset, setFilteredDataset] = useState(dataset);

  // update yAxisOptions when benchmark changes

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
          const A =
            typeof a[xAxis.column] === "string"
              ? a[xAxis.column].toLowerCase()
              : a[xAxis.column];
          const B =
            typeof b[xAxis.column] === "string"
              ? b[xAxis.column].toLowerCase()
              : b[xAxis.column];
          if (A < B) {
            return sortBy.type === "asc" ? 1 : -1;
          }
          if (A > B) {
            return sortBy.type === "asc" ? -1 : 1;
          }
          return 0;
        })
    );
  }, [xAxis, yAxis, dataset, sortBy.type]);

  useEffect(() => {
    setSortBy({ column: "YEAR", type: "asc" });
  }, []);

  function requestSort(column) {
    setSortBy({
      column,
      type: sortBy.type === "asc" && sortBy.column === column ? "desc" : "asc",
    });
    setFilteredDataset(
      dataset
        .filter((x) => x[xAxis.column] && x[yAxis.column])
        .sort((a, b) => {
          const A =
            typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
          const B =
            typeof b[column] === "string" ? b[column].toLowerCase() : b[column];
          if (A < B) {
            return sortBy.type === "asc" ? 1 : -1;
          }
          if (A > B) {
            return sortBy.type === "asc" ? -1 : 1;
          }
          return 0;
        })
    );
  }
  // ==============================================================
  function downloadData(format) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataset);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    if (format === ".xlsx") {
      XLSX.writeFile(wb, `${benchmark.name}.xlsx`);
    } else {
      XLSX.writeFile(wb, `${benchmark.name}.csv`);
    }
  }

  function formatUnit(value, unit, decimals = 2) {
    const parsedValue = Number(value);
    if (parsedValue === 0) return "0 flops";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      unit,
      "K" + unit,
      "M" + unit,
      "G" + unit,
      "T" + unit,
      "P" + unit,
      "E" + unit,
      "Z" + unit,
      "Y" + unit,
    ];

    const i = Math.floor(Math.log(parsedValue) / Math.log(k));

    return (
      parseFloat((parsedValue / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    );
  }

  //   ==============================================================

  return (
    <main className="flex-grow  mb-16">
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
        {/* Replace with your content */}
        <div>
          <h1 className="text-xl font-bold text-center text-gray-900">
            {benchmark.name}
          </h1>
          <div className="hidden sm:grid  grid-cols-[1fr_1fr_min-content_1fr_1fr] items-center gap-2 justify-center mt-5">
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
                  {yAxisOptions.filter(x=> x.column !== xAxis.column).map((option, index) => (
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
                  {xAxisOptions.filter(x=> x.column !== yAxis.column).map((option, index) => (
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
          <div className="hidden sm:block">
            {filteredDataset.length > 2 ? (
              <Chart
                dataset={dataset}
                benchmark={`${benchmark.name}`}
                xAxis={xAxis}
                yAxis={yAxis}
                downloadData={downloadData}
              />
            ) : (
              <div className="mt-8 text-center bg-slate-50 py-16">
                <p className="text-gray-900 ">
                  Not enough data is available for this benchmark. Try changing
                  the axes.
                </p>
              </div>
            )}
          </div>

          <div className=" shadow-md sm:rounded-lg mt-8">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="sticky top-0 text-xs table-fixed text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3  sm:w-1/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("DEPTH")}
                    >
                      <p>DEPTH</p>
                      {sortBy.column === "DEPTH" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3  sm:w-1/5">
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("# OF WEELS")}
                    >
                      <p># OF WEELS</p>
                      {sortBy.column === "# OF WEELS" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/5"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("YEAR")}
                    >
                      <p>YEAR</p>
                      {sortBy.column === "YEAR" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/5"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("SUCCESS RATE")}
                    >
                      <p>{"SUCCESS RATE"}</p>
                      {sortBy.column === "SUCCESS RATE" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/5"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("GFLOPS")}
                    >
                      <div className="flex gap-1">COMPUTING POWER</div>
                      {sortBy.column === "GFLOPS" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">open</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDataset.length > 0 ? (
                  (showMore
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
                              {data["DEPTH"] || '-'}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-pre-wrap"
                            >
                              {data["# OF WEELS"] || '-'}
                            </th>
                            <td className="hidden sm:table-cell px-6 py-2">
                              {data["YEAR"]}
                            </td>

                            <td className="hidden sm:table-cell px-6 py-2">
                              {data["SUCCESS RATE"] || '-'}
                            </td>
                            <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap">
                              {data["GFLOPS"]
                                ? formatUnit(
                                    data["GFLOPS"],
                                    "FLOPS"
                                  )
                                : "-"}
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
                        </>
                      )}
                    </Disclosure>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan="5" className="text-gray-900 py-2">
                      No data available
                    </td>
                  </tr>
                )}
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
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span className="block">Want to contribute?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-200">
                You have access to our database where you can point out any
                errors or suggest changes
              </p>
              <a
                href="https://docs.google.com/spreadsheets/d/14YFYHXBeUwqnD00X57LaIXETEukPHCMRfor30ictSJI/edit#gid=1174639600"
                rel="noopener noreferrer"
                target="_blank"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base leading-6 font-medium text-[#AA3248] hover:text-[#8a283a] hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                Go to database
              </a>
            </div>
          </div>
          <div className="relative pb-3/5 -mt-6 md:pb-1/2">
            <img
              className="absolute inset-0 w-full h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/database.jpg"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
