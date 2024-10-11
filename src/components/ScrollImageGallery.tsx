import React, { useRef, useEffect, useState } from "react";

const ScrollImageGallery = () => {
  const containerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && horizontalScrollRef.current) {
        const container = containerRef.current;
        const horizontalScroll = horizontalScrollRef.current;

        const containerRect = container.getBoundingClientRect();
        const horizontalScrollRect = horizontalScroll.getBoundingClientRect();

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate the start and end points of the scroll effect
        const start = containerRect.top + scrollTop - windowHeight;
        const end = containerRect.bottom + scrollTop;

        // Calculate progress
        const progress = Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));

        setScrollProgress(progress);

        // Calculate the horizontal scroll position
        const maxScroll = horizontalScroll.scrollWidth - horizontalScroll.clientWidth;
        const scrollPosition = progress * maxScroll;

        horizontalScroll.scrollLeft = scrollPosition;

        console.log("Scroll progress:", progress);
        console.log("Scroll position:", scrollTop);
        console.log("Start point:", start);
        console.log("End point:", end);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial call to set the correct position
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-image-gallery">
      <div className="vertical-scroll">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <img
            key={num}
            src={`/images/${num}.jpg`}
            alt={`Vertical scroll image ${num}`}
            className="w-full h-auto mb-4"
          />
        ))}
      </div>

      <div
        ref={horizontalScrollRef}
        className="horizontal-scroll whitespace-nowrap sticky bottom-0"
        style={{
          height: "50vh",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {[7, 8, 9, 10, 11, 12].map((num) => (
            <img
              key={num}
              src={`/images/${num}.jpg`}
              alt={`Horizontal scroll image ${num}`}
              className="inline-block h-full w-auto mr-4"
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          padding: "10px",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          zIndex: 1000,
        }}
      >
        Scroll Progress: {(scrollProgress * 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default ScrollImageGallery;
