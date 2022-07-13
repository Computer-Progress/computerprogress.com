import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/outline";
export default function Home() {
  const ourWork = [
    {
      title: "The Computation Limits of Deep Learning",
      description:
        "This project aims to catalog the deep learning’s voracious appetite for computing power, showing that progress across a wide variety of applications is strongly reliant on increases in computing power.",
      date: "2022",

      authors: "Thompson, N. et al",

      paperUrl: "/benchmarks/image-classification-on-imagenet",
      dataUrl: "/benchmarks/image-classification-on-imagenet",
      image: "/chart-imagenet.png",
    },
    {
      title: "Compute Trends Across Three Eras of Machine Learning",
      description:
        "This project aims to highlight the fast-growing compute requirements for training advanced ML systems of three eras: the Pre Deep Learning Era, the Deep Learning Era and the Large-Scale Era.",
      date: "2022",
      authors: "Sevilla, J. et al",
      paperUrl: "/trends",
      dataUrl: "/trends",
      image: "/chart-trends.png",
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
            <h2 className="text-white text-lg sm:text-xl mt-8 text-center font-bold">
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
                      objectFit="cover"
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
                    <div className="my-5 flex w-full items-center justify-around">
                      <a
                        className="bg-[#AA3248] flex items-center justify-center px-4 py-1 text-white gap-1 rounded-lg font-medium"
                        href={item.paperUrl}
                      >
                        PAPER <ArrowRightIcon className="w-4 h-4" />
                      </a>
                      <a
                        className="bg-[#AA3248] flex items-center justify-center px-4 py-1 text-white gap-1 rounded-lg font-medium"
                        href={item.dataUrl}
                      >
                        DATA <ArrowRightIcon className="w-4 h-4" />
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
