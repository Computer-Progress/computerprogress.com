import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/deep-learnings-diminishing-returns/Header";
import Main from "../components/deep-learnings-diminishing-returns/Main";
import Footer from "../components/Footer";
import { getDataset } from "../lib/api";
import { parseBenchmark } from "../lib/parser";

export default function Home({ benchmarks, dataset, accuracyTypes }) {
  return (
    <div>
      <Head>
        <title>
          Computer Progress - Deep Learning{"'"}s diminishing returns
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
        <Header className="flex-1" benchmarks={benchmarks}></Header>
        <Main
          className="flex-grow"
          accuracyTypes={accuracyTypes}
          dataset={dataset}
          benchmarks={benchmarks}
        ></Main>
        <Footer className="flex-1" />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const spreadsheetId = "1xthNnZ_I43SUXzLvuP7TFXsd-XeHDUx_4dedH5sE2GM";
  const [benchmarks, benchmark] = await Promise.all([
    getDataset("benchmarks", spreadsheetId),
    getDataset("image-classification-on-imagenet", spreadsheetId),
  ]);
  let { dataset, accuracyTypes } = await parseBenchmark(benchmark);
  console.log(dataset[0])
  dataset = dataset.map((d) => ({
    ...d,
    error: 100 - Number(d['TOP 1 score']),
  }));

  return {
    props: {
      benchmarks,
      dataset,
      accuracyTypes,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking", // false or 'blocking'
//   };
// }
