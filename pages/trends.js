import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/trends/Header";
// import Main from "../components/trends/Main";
import Footer from "../components/Footer";
import { getDataset } from "../lib/api";
import { parseBenchmark } from "../lib/parser";
import { useEffect } from "react";
import Script from "next/script";
export default function Home({ benchmarks, dataset, accuracyTypes }) {
  useEffect(() => {
    try {
      buildTrendsGraph("#trends-graph");
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <div>
      <Head>
        <title>Parameter, Compute and Data Trends in Machine Learning</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-array@3"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-color@3"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-format@3"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-interpolate@3"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-time@3"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-time-format@4"
      />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/d3-scale/d3-scale@4"
      />

      <Script strategy="afterInteractive" src="/trends/plotter/HEADER.js" />
      <Script strategy="afterInteractive" src="/trends/plotter/utils.js" />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/canvas-txt.js"
      />
      <Script strategy="afterInteractive" src="/trends/plotter/libs/modal.js" />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/libs/interact.min.js"
      />
      <Script strategy="afterInteractive" src="/trends/plotter/libs/event.js" />
      <Script strategy="afterInteractive" src="/trends/plotter/canvas.js" />
      <Script strategy="afterInteractive" src="/trends/plotter/objects.js" />
      <Script strategy="afterInteractive" src="/trends/plotter/controls.js" />
      <Script strategy="afterInteractive" src="/trends/plotter/plotter.js" />
      <Script
        strategy="afterInteractive"
        src="/trends/plotter/multislider.js"
      />

      <Script strategy="afterInteractive" src="/trends/database.js" />
      <Script strategy="afterInteractive" src="/trends/stats.js" />
      <Script strategy="afterInteractive" src="/trends/trends.js" />
      <Script strategy="afterInteractive" src="/trends/presets.js" />
      <Script strategy="afterInteractive" src="/trends/graph.js" />
      <Script
        strategy="lazyOnload"
        id="show-graph"
      >{`buildTrendsGraph("#trends-graph")`}</Script>

      <div className="min-h-full">
        <Navbar></Navbar>
        <Header></Header>
        <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8 mt-10">
          <div className="graph-wrapper">
            <div id="trends-graph"></div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const spreadsheetId = "1N5CHCc9tuRKOzFrzdAWrG9_u9RbXDoCYXbaGvb-kbu0";

  const dataset = await getDataset("NOTABLE ML SYSTEMS", spreadsheetId);

  return {
    props: {
      dataset,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}
