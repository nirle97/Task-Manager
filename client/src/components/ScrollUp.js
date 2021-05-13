import React from "react";

function ScrollUp() {
    function scrollToTop(e) {
        e.preventDefault();
        const href = e.target.parentElement.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;
        window.scroll({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    return (
        <>
          <a href=".App" className="scroll-up" onClick={scrollToTop}>
            <i className="fas fa-arrow-circle-up"></i>
          </a>
        </>    
    )
}

export default ScrollUp;