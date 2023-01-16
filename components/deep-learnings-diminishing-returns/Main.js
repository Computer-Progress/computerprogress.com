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
import Chart2 from "./Chart2";

import * as XLSX from "xlsx/xlsx.mjs";

export default function Main({ benchmarks, dataset, accuracyTypes }) {
  const router = useRouter();
  const benchmark = benchmarks.find(
    (benchmark) => benchmark[2] === router.query.slug
  );
  const [sortBy, setSortBy] = useState("error");

  const [showMore, setShowMore] = useState(false);
  //   ==============================================================

  const [bestOfEachYear, setBestOfEachYear] = useState([]);
  // set array with best of each year
  const [filteredDataset, setFilteredDataset] = useState(bestOfEachYear);
  useEffect(() => {
    const bestofyear = dataset
      .filter((d) => d["hardware_burden"])
      .reduce((acc, curr) => {
        if (acc[curr.year]) {
          if (acc[curr.year].error > curr.error) {
            acc[curr.year] = curr;
          }
        } else {
          acc[curr.year] = curr;
        }
        return acc;
      }, {});
    const listBestOfEachYear = Object.values(bestofyear).map(
      // includes money equivalent and carbon equivalent
      (d) => ({
        ...d,
        money_equivalent: Number(d["hardware_burden"]) / 68740540540540600,
        carbon_equivalent: Number(d["hardware_burden"]) / 349756347991684000,
      })
    );
    setBestOfEachYear(listBestOfEachYear);
    setFilteredDataset(listBestOfEachYear);
  }, [dataset]);

  function requestSort(column) {
    console.log("requestSort", column);
    setSortBy({
      column,
      type: sortBy.type === "asc" && sortBy.column === column ? "desc" : "asc",
    });
    setFilteredDataset(
      bestOfEachYear.sort((a, b) => {
        if (column === "name") {
          if (a[column].toLowerCase() < b[column].toLowerCase()) {
            return sortBy.type === "asc" ? 1 : -1;
          }
          if (a[column].toLowerCase() > b[column].toLowerCase()) {
            return sortBy.type === "asc" ? -1 : 1;
          }
          return 0;
        } else {
          const a1 = Number(a[column]);
          const b1 = Number(b[column]);
          if (a1 < b1) {
            return sortBy.type === "asc" ? 1 : -1;
          }
          if (a1 > b1) {
            return sortBy.type === "asc" ? -1 : 1;
          }
          return 0;
        }
      })
    );
  }
  // open url with new query

  // ==============================================================
  function downloadData(format) {
    const wb = XLSX.utils.book_new();
    const headers = [
      "model_name",
      "year",
      "error",
      "computation_used",
      "dollar_equivalent",
      "carbon_equivalent",
      "paper_title",
      "paper_url",
      "ops_per_network_pass",
      "parameters",
    ];

    const dataset = filteredDataset.map((d) => {
      return {
        model_name: d.name,
        year: d.year,
        error: d.error,
        computation_used: d.hardware_burden,
        dollar_equivalent: d.money_equivalent,
        carbon_equivalent: d.carbon_equivalent,
        paper_title: d.title,
        paper_url: d.paper_link,
        ops_per_network_pass: d.flops || d.multiadds,
        parameters: d.parameters,
      };
    });

    const ws = XLSX.utils.json_to_sheet(dataset);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // if (format === ".xlsx") {
    //   window.open(
    //     "https://docs.google.com/spreadsheets/d/1xthNnZ_I43SUXzLvuP7TFXsd-XeHDUx_4dedH5sE2GM/export?format=xlsx&id=1xthNnZ_I43SUXzLvuP7TFXsd-XeHDUx_4dedH5sE2GM",
    //     "_blank"
    //   );

    //   // XLSX.writeFile(wb, `${benchmark[0]} on ${benchmark[1]}.xlsx`);
    // } else {
    XLSX.writeFile(wb, `deep_Learning_diminishing_returns.csv`);
    // }
  }

  function formatUnit(value, unit, decimals = 0, spacing = true) {
    const parsedValue = Number(value);
    if (parsedValue === 0) return "0" + unit;

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
      parseFloat((parsedValue / Math.pow(k, i)).toFixed(dm)) +
      (spacing ? " " : "") +
      sizes[i]
    );
  }

  //   ==============================================================

  return (
    <main className="flex-grow  mb-16">
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
        {/* Replace with your content */}
        <div>
          <div className="hidden sm:block">
            {filteredDataset.length > 2 ? (
              <>
                <h1 className="text-xl font-bold text-center text-gray-900 uppercase my-6">
                  Why it feels progress in deep learning will be rapid
                  <span className="block text-sm font-normal">
                    (Benchmark: Imagenet)
                  </span>
                </h1>
                <Chart
                  dataset={dataset.filter((d) => d["hardware_burden"])}
                  bests={bestOfEachYear}
                  benchmark={`${benchmark[0]} on   ${benchmark[1]}`}
                  downloadData={downloadData}
                />
                <h1 className="text-xl font-bold text-center text-gray-900 uppercase my-6">
                  Why, under the hood, that is not sustainable
                </h1>
                <Chart2
                  dataset={dataset.filter((d) => d["hardware_burden"])}
                  bests={bestOfEachYear}
                  benchmark={`${benchmark[0]} on ${benchmark[1]}`}
                  downloadData={downloadData}
                />
              </>
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
                  <th scope="col" className="px-6 py-3  sm:w-1/7">
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
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/7"
                  >
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
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/7"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("error")}
                    >
                      <p className="whitespace-nowrap">TOP 1 SCORE (% error)</p>
                      {sortBy.column === "error" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/7"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("carbon_equivalent")}
                    >
                      <p className="text-left">
                        CO<sub>2</sub> equivalent Emissions
                      </p>
                      {sortBy.column === "carbon_equivalent" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/7"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("money_equivalent")}
                    >
                      <p className="text-left" >dollar equivalent</p>
                      {sortBy.column === "money_equivalent" &&
                        (sortBy.type === "asc" ? (
                          <SortAscendingIcon className="h-4 w-4 text-gray-300" />
                        ) : (
                          <SortDescendingIcon className="h-4 w-4 text-gray-300" />
                        ))}
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 w-1/7"
                  >
                    <button
                      className="flex items-center uppercase gap-2"
                      onClick={() => requestSort("hardware_burden")}
                    >
                      <div className="flex gap-1 text-left">Computation Used For Training</div>
                      {sortBy.column === "hardware_burden" &&
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
                              className="px-6 py-2 font-medium text-gray-900 whitespace-pre-wrap "
                            >
                              {data["name"]}
                            </th>
                            <td className="hidden sm:table-cell px-6 py-2">
                              {data["year"]}
                            </td>

                            <td className="hidden sm:table-cell px-6 py-2">
                              {Number(data["error"]).toFixed(2)}%
                            </td>
                            <td className="hidden sm:table-cell px-6 py-2">
                              {data["carbon_equivalent"].toFixed(0)} lbs
                            </td>
                            <td className="hidden sm:table-cell px-6 py-2">
                              $
                              {formatUnit(
                                data["money_equivalent"],
                                "",
                                data["money_equivalent"] > 1e6 ? 1 : 0,
                                false
                              )}
                            </td>

                            <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap">
                              {data["hardware_burden"]
                                ? formatUnit(data["hardware_burden"], "FLOPs")
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

                          <Disclosure.Panel as="tr" className="   bg-white  ">
                            <td colSpan="7">
                              <div className="border-x-[#AA3248] border-x-2 p-6 sm:grid sm:grid-cols-3 gap-8">
                                <div>
                                  <h2 className="font-bold">Paper</h2>
                                  <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2 mt-1">
                                    <div>
                                      <p className="text-xs">Title</p>
                                      <p className="text-gray-900 flex flex-wrap gap-1">
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
                                    <div className="block sm:hidden">
                                      <p className="text-xs flex gap-1">Year</p>
                                      <p className="text-gray-900">
                                        {data["year"] || "-"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-8 sm:mt-0">
                                  <h2 className="font-bold">External links</h2>

                                  <p className="text-[#21cbce] ">
                                    <a
                                      className="text-[#21cbce] hover:text-[#1eb2b4] inline-flex gap-1 justify-start"
                                      title="paper with code"
                                      href={
                                        "https://paperswithcode.com" +
                                        data["paper_with_code"]
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {" "}
                                      Paper with code
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

                                <div className="mt-8 sm:mt-0">
                                  <h2 className="font-bold">
                                    Model Characteristics
                                  </h2>

                                  <div className="flex flex-col sm:flex-row  gap-x-5 gap-y-2 mt-1">
                                    <div>
                                      <p className="text-xs flex gap-1">
                                        Operations per network pass
                                      </p>
                                      <p className="text-gray-900">
                                        {(data["flops"] &&
                                          formatUnit(data["flops"], "FLOPs")) ||
                                          (data["multiadds"] &&
                                            formatUnit(
                                              data["multiadds"] * 2,
                                              "FLOPs"
                                            )) ||
                                          "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs">Paramenters</p>
                                      <p className="text-gray-900">
                                        {(data["parameters"] &&
                                          formatUnit(data["parameters"], "")) ||
                                          "-"}
                                      </p>
                                    </div>
                                    <div className="block sm:hidden">
                                      <p className="text-xs flex gap-1">
                                        Computation used for training
                                      </p>
                                      <p className="text-gray-900">
                                        {data["hardware_burden"]
                                          ? formatUnit(
                                              data["hardware_burden"],
                                              "FLOPs"
                                            )
                                          : "-"}
                                      </p>
                                    </div>
                                    <div className="block sm:hidden">
                                      <p className="text-xs flex gap-1">
                                        TOP 1 score (% error)
                                      </p>
                                      <p className="text-gray-900">
                                        {data["error"].toFixed(2) + "%"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-8 sm:mt-0 block sm:hidden">
                                  <h2 className="font-bold">Estimated Cost</h2>
                                  <div className="flex flex-col sm:flex-row  gap-x-5 gap-y-2 mt-1">
                                    <div className="block sm:hidden">
                                      <p className="text-xs">
                                        CO<sub>2</sub> Equivalent Emissions
                                      </p>
                                      <p className="text-gray-900">
                                        {data["carbon_equivalent"].toFixed(0)}
                                        lbs
                                      </p>
                                    </div>
                                    <div className="block sm:hidden">
                                      <p className="text-xs flex gap-1">
                                        Dollar Equivalent
                                      </p>
                                      <p className="text-gray-900">
                                        $
                                        {formatUnit(
                                          data["money_equivalent"],
                                          "",
                                          2,
                                          false
                                        )}
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
                href="https://docs.google.com/spreadsheets/d/1xthNnZ_I43SUXzLvuP7TFXsd-XeHDUx_4dedH5sE2GM/edit#gid=1571653277"
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
