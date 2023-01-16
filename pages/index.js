import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  LinkIcon,
  PaperClipIcon,
  TableIcon,
} from "@heroicons/react/outline";
export default function Home() {
  const ourWork = [
    {
      title: "The Computation Limits of Deep Learning",
      description:
        "This project aims to catalog the deep learning’s voracious appetite for computing power, showing that progress across a wide variety of applications is strongly reliant on increases in computing power.",
      date: "2022",

      authors: "Thompson, N. et al",

      paperUrl: "https://arxiv.org/abs/2007.05558v2",
      dataUrl: "/computation-limits-deep-learning/image-classification-on-imagenet",
      image: "/chart-imagenet.png",
    },
    {
      title: "Compute Trends Across Three Eras of Machine Learning",
      description:
        "This project aims to highlight the fast-growing compute requirements for training advanced ML systems of three eras: the Pre Deep Learning Era, the Deep Learning Era and the Large-Scale Era.",
      date: "2022",
      authors: "Sevilla, J. et al",
      paperUrl: "https://arxiv.org/abs/2202.05924",
      dataUrl: "/compute-trends-machine-learning",
      image: "/chart-trends.png",
    },
    {
      title: "The Importance of (Exponentially More) Computing Power",
      description:
        "This project aims to show how more powerful computers are improving outcomes across society. For that, we looked across five key application areas: Computer Chess, Computer Go, Weather Prediction, Protein Folding, and Oil Exploration.",
      date: "2022",
      authors: "Thompson, N. et al",
      paperUrl: "https://arxiv.org/abs/2206.14007",
      dataUrl: "/importance-of-computing-power/computer-chess",
      image: "/chart-chess.png",
    },
    {
      title: "Deep Learning's Diminishing Returns: The Cost of Improvement is Becoming Unsustainable",
      description:
        "Deep learning is now being used to translate between languages, predict how proteins fold, analyze medical scans, and play games as complex as Go, to name just a few applications of a technique that is now becoming pervasive. Success in those and other realms has brought this machine-learning technique from obscurity in the early 2000s to dominance today. ",
      date: "2022",
      authors: "Thompson, N. et al",
      paperUrl: "https://spectrum.ieee.org/deep-learning-computational-cost",
      dataUrl: "/deep-learnings-diminishing-returns",
      image: "/deep-learning-diminishing-returns.png",
    },
  ];

  useEffect(() => {
    var bgvideo = document.getElementById("bgVideo");
    bgvideo.play();
  }, []);

  return (
    <>
      <div className="min-h-screen relative">
        <Head>
          <title>Computer Progress</title>
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
          <meta name="title" content="Computer Progress" />
          <meta
            name="description"
            content="Working to understand the economic and technical foundations of progress in computing
"
          />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/"
          />
          <meta property="og:title" content="Computer Progress" />
          <meta
            property="og:description"
            content="Working to understand the economic and technical foundations of progress in computing"
          />
          <meta
            property="og:image"
            content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/meta_logo.png"
          />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/"
          />
          <meta property="twitter:title" content="Computer Progress" />
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

        <Navbar hideLogo={true}></Navbar>
        <div className="relative  h-[30rem]  flex flex-col items-center min-w-screen justify-end flex-1">
          <div className="    max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl sm:text-5xl text-center font-bold">
              COMPUTER PROGRESS
            </h1>
            <h2 className="text-white text-lg sm:text-2xl mt-8 text-center font-bold">
              Working to understand the economic and technical foundations of
              progress in computing
            </h2>
          </div>
          <div className="bg-black video-docker -z-10 absolute top-0 left-0 w-full h-full overflow-hidden bg-transparent">
            <video
              id="bgVideo"
              className="min-w-full min-h-full absolute object-cover "
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="hero1.webm" type="video/mp4" />
              <source src="hero1.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
        <div className="bg-gray-50 pb-16">
          <div className="max-w-7xl mx-auto bg-gray-0 py-6 px-4 sm:px-6 lg:px-8 ">
            <h3 className="mt-8 text-gray-900 text-2xl sm:text-3xl font-bold">
              Our work:
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 place-items-stretch">
              {ourWork.map((item, index) => (
                <div
                  className="w-full h-full rounded-lg bg-transparent flex flex-1 flex-col justify-between border shadow-lg border-1 border-gray-200 hover:border-gray-300"
                  key={index}
                >
                  <div className="relative aspect-video bg-white rounded-t-lg w-full overflow-hidden ">
                    <Image
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                      src={item.image}
                    />
                  </div>
                  <div className="bg-white flex-1 rounded-b-lg  p-4 flex flex-col items-end justify-end leading-normal">
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-medium text-lg mb-2 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 font-normal text-md mb-2 ">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 w-full mt-4">
                      <div className="flex gap-4">
                        <a
                          className="flex items-center justify-center  py-1 hover:underline text-[#AA3248] gap-1 rounded-lg font-medium"
                          href={item.paperUrl}
                        >
                          <LinkIcon className="w-5 h-5" /> Paper
                        </a>
                        <a
                          className="flex items-center justify-center  py-1 hover:underline text-[#AA3248] gap-1 rounded-lg font-medium"
                          href={item.dataUrl}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="61.563"
                            height="61.54"
                            className="w-[1.1rem] h-[1.1rem]"
                            fill="currentColor"
                            viewBox="292.828 218.506 61.563 61.54"
                          >
                            <path d="M297.36 275.532h57.031l-.027 4.514h-61.536l.014-2.258.355-59.282h4.505l-.342 57.026z"></path>
                            <path d="M330.733 256.678l13.529-23.196 3.891 2.244-16.028 27.481-15.648-11.087-11.686 20.036-3.892-2.244 14.187-24.321 2.004 1.42 13.643 9.667z"></path>
                            <path d="M350.985 228.018l.076 10.325.015 2.188-1.903-1.07-8.981-5.043-1.9-1.068 1.889-1.119 8.905-5.282 1.884-1.118.015 2.187z"></path>
                          </svg>{" "}
                          Data
                        </a>
                      </div>
                      <div className="">
                        <span className="text-gray-500 font-normal text-sm">
                          By {item.authors}
                        </span>
                        {" - "}
                        <span className="text-gray-500 font-normal text-sm">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// export async function getStaticProps(context) {
//   const dataset = await getDataset();

//   return {
//     props: {
//       dataset,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     revalidate: 30, // In seconds
//   };
// }
