import Head from "next/head";
import Navbar from "../../components/Navbar";
import Header from "../../components/importance-of-computing-power/Header";
import Main from "../../components/importance-of-computing-power/weather-prediction/Main";
import Footer from "../../components/Footer";
import { getDataset } from "../../lib/api";
import { parseBenchmark } from "../../lib/parser";

export default function Home({  dataset, accuracyTypes }) {
  const benchmarks = [
    {
      name: "Computer Chess",
      range: "computer-chess",
    },
    {
      name: "Computer Go",
      range: "computer-go",
    },
    {
      name: "Weather Prediction (NOAA)",
      range: "weather-prediction",
    },
    {
      name: "Protein Folding",
      range: "protein-folding",
    },
    {
      name: "Oil Exploration (BP)",
      range: "oil-exploration",
    },
  ];
  return (
    <div>
      <Head>
        <title>
          Computer Progress - The Computation Limits of Deep Learning
        </title>
        <meta
          name="description"
          content="Working to understand the economic and technical foundations of progress in computing"
        />
        <meta
          name="keywords"
          content="Computer Progress, Deep Learning, Computation Power"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English"></meta>
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Primary Meta Tags --> */}
        <meta
          name="title"
          content="The Computation Limits of Deep Learning
 - Computer Progress"
        />
        <meta
          name="description"
          content="Working to understand the economic and technical foundations of progress in computing
"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/computation-limits-deep-learning"
        />
        <meta
          property="og:title"
          content="The Computation Limits of Deep Learning
 - Computer Progress"
        />
        <meta
          property="og:description"
          content="Working to understand the economic and technical foundations of progress in computing
"
        />
        <meta
          property="og:image"
          content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/meta_logo.png"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/computation-limits-deep-learning"
        />
        <meta
          property="twitter:title"
          content="The Computation Limits of Deep Learning
 - Computer Progress"
        />
        <meta
          property="twitter:description"
          content="Working to understand the economic and technical foundations of progress in computing
"
        />
        <meta
          property="twitter:image"
          content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/meta_logo.png"
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar className="flex-1"></Navbar>
        <Header benchmarks={benchmarks} className="flex-1"></Header>
        <Main
          className="flex-grow"
          dataset={dataset}
          benchmarks={benchmarks}

        ></Main>
        <Footer className="flex-1" />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const spreadsheetId = "1b3yTYqPCk3Q_7iLtYMJj3g0G7pyJIX2tNn4eeQnidiU";
  const data = await getDataset('weather-prediction', spreadsheetId);
  const dataset = [];
  data.slice(1).forEach((row, index) => {
    const rowObject = {};
    rowObject["ORDER_INDEX"] = index;
    row.forEach((column, i) => {
      rowObject[data[0][i]] = column.trim();
    });
    if (rowObject["YEAR"]) dataset.push(rowObject);
  });

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