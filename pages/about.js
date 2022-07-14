import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { MailIcon, MailOpenIcon } from "@heroicons/react/outline";
export default function About() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between relative">
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
            content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/about"
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
            content="https://new-computerprogress.d2a3k566pnqgrg.amplifyapp.com/about"
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

        <Navbar></Navbar>
        <main className="flex-1 bg-gray-50 pb-12">
          <div className="bg-black">
            <div className="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-center">
              <div className="max-w-xl">
                <h2 className="text-4xl leading-10 font-medium text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
                  About
                </h2>
              </div>
            </div>
          </div>
          <div className="relative mt-8 px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose  mx-auto mb-12">
              <p className="text-lg text-gray-500 leading-8">
                <b>Computer Progress</b> is an initiative by the FutureTech
                Project aimed at sharing research and data on progress in
                computing. We produce, host, and distribute data that elucidate
                the economic and technical foundations of progress in computing.
              </p>
              <div className="flex justify-center mt-6">
                <a
                  href="https://futuretech.mit.edu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/futuretech light.svg"
                    alt="future tech"
                    height={200}
                    width={400}
                  />
                </a>
              </div>
            </div>
            <div className="text-lg max-w-prose  mx-auto mb-12">
              <h2 className="text-2xl font-bold text-gray-900 leading-8 mb-2">
                Contributing
              </h2>
              <p className="text-md text-gray-500 leading-8">
                We link to Google sheets at the bottom of each Project page.
                Please leave a comment on the sheets to point out any errors and
                to suggest changes.
              </p>
            </div>
            <div className="text-lg max-w-prose  mx-auto mb-12">
              <h2 className="text-2xl font-bold text-gray-900 leading-8 mb-2">
                Team
              </h2>
              <p className="text-lg text-gray-500 leading-8">
                The Computer Progress initiative is managed by Gabriel Manso,
                Neil Thompson.
              </p>
            </div>
          
            <div className="text-lg max-w-prose  mx-auto mb-12">
              <h2 className="text-2xl font-bold text-gray-900 leading-8 mb-2">
                Collaborators
              </h2>
              <div>
                <a
                  href="https://epochai.org/"
                  className="relative  "
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/epoch-logo.svg"
                    alt="future tech"
                    height={64}
                    width={200}
                  />
                </a>
              </div>
            </div>
            
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
