import Script from "next/script";
import { useEffect } from "react";
import buildTrendsGraph from './graph'

export default function Chart() {
  useEffect(() => {
    try {
      buildTrendsGraph("#trends-graph");
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <>
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
        <div className="graph-wrapper">
          <div id="trends-graph"></div>
        </div>
      </div>
    </>
  );
}
