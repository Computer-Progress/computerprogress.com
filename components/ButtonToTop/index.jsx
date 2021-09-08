import React, { useEffect } from "react";
import { BackToTop, BackToTopIcon } from "./styles.js";

function ButtonToTop({ router, query }) {
  const handleScroll = () => {
    const backButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backButton.style.display = "block";
    } else {
      backButton.style.display = "none";
    }
  }

  function topFunction() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
   <BackToTop id="backToTop" onClick={topFunction}>
      <BackToTopIcon />
    </BackToTop>
  );
}

export default ButtonToTop;
