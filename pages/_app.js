import Script from "next/script";
import "../styles/globals.css";
import CookieConsent from "react-cookie-consent";

function AcceptButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="m-2 bg-[#AA3248] font-medium flex gap-1 text-sm text-white px-3 py-2 rounded-lg focus:ring-2 outline-none  focus:ring-[#AA3248] ring-offset-1 ring-opacity-25">
      {children}
    </button>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <CookieConsent
        location="bottom"
        buttonText="Accept All Cookies"
        ButtonComponent={AcceptButton}
        style={{ background: "black", borderTop: "2px solid #AA3248" }}
        buttonStyle={{ background: "#AA3248", fontSize: "14px" }}
        containerClasses=" px-4 sm:px-6 lg:px-32"
        expires={999}
      >
      {` By clicking "Accept All Cookies", you agree to the storing of cookies on your device to enhance site navigation and analyze site usage.`}
      </CookieConsent>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
