import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/trends/Header";
import Main from "../components/trends/Main";
import Footer from "../components/Footer";
import { getDataset } from "../lib/api";
import { init } from "../components/trends/graph/trends";
export default function Home({ dataset }) {
  return (
    <div>
       <Head>
        <title>
          Computer Progress - Compute Trends Across Three Eras of Machine Learning</title>
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
        <meta name="title" content="Compute Trends Across Three Eras of Machine Learning - Computer Progress" />
        <meta
          name="description"
          content="Working to understand the economic and technical foundations of progress in computing
"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/compute-trends-machine-learning" />
        <meta property="og:title" content="Compute Trends Across Three Eras of Machine Learning - Computer Progress" />
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
        <meta property="twitter:url" content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/compute-trends-machine-learning" />
        <meta property="twitter:title" content="Compute Trends Across Three Eras of Machine Learning - Computer Progress" />
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
      <div className="min-h-full">
        <Navbar></Navbar>
        <Header></Header>
        <Main dataset={dataset} />

        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const spreadsheetId = "1AAIebjNsnJj_uKALHbXNfn3_YsT6sHXtCU0q7OIPuc4";

  const data = await getDataset("NOTABLE ML SYSTEMS", spreadsheetId);
  const dataset = data.slice(1).map((row) => {
    const rowObject = {};
    row.forEach((column, i) => {
      rowObject[data[0][i]] = column.trim();
    });
    rowObject["Training compute per parameter (FLOPs)"] =
      rowObject["Training compute (FLOPs)"] / rowObject["Parameters"];
    rowObject["Training compute times parameters"] =
      rowObject["Training compute (FLOPs)"] * rowObject["Parameters"];
    return rowObject;
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
