import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSwipeable } from "react-swipeable";
import { useMediaQuery } from "react-responsive";
import "./MenuBook.css";

import menu2 from "/src/assets/menu/Menu-02.png";
import menu3 from "/src/assets/menu/Menu-03.png";
import menu4 from "/src/assets/menu/Menu-04.png";
import menu5 from "/src/assets/menu/Menu-05.png";
import menu6 from "/src/assets/menu/Menu-06.png";
import menu7 from "/src/assets/menu/Menu-07.png";
import menu8 from "/src/assets/menu/Menu-08.png";
import menu9 from "/src/assets/menu/Menu-09.png";
import menu10 from "/src/assets/menu/Menu-10.png";
import menu11 from "/src/assets/menu/Menu-11.png";
import menu12 from "/src/assets/menu/Menu-12.png";
import menu13 from "/src/assets/menu/Menu-13.png";
import menu14 from "/src/assets/menu/Menu-14.png";
import menu15 from "/src/assets/menu/Menu-15.png";
import menu16 from "/src/assets/menu/Menu-16.png";
import { ClipLoader } from "react-spinners";

const menuImages = [
  menu2,
  menu3,
  menu4,
  menu5,
  menu6,
  menu7,
  menu8,
  menu9,
  menu10,
  menu11,
  menu12,
  menu13,
  menu14,
  menu15,
  menu16,
];

const MenuBook: React.FC = () => {
  //@ts-expect-error Ref is not null
  const flipbookRef = useRef<HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Swipe Handlers for Mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => flipbookRef.current?.pageFlip().flipNext(),
    onSwipedRight: () => flipbookRef.current?.pageFlip().flipPrev(),
    trackMouse: true,
  });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const images = menuImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const handleLoad = () => {
      setLoading(false);
    };

    Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
          })
      )
    ).then(handleLoad);

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, []);

  const handleNext = () => flipbookRef.current?.pageFlip().flipNext();
  const handlePrev = () => flipbookRef.current?.pageFlip().flipPrev();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (e: any) => setCurrentPage(e.data);

  return (
    <div className="book-container" {...handlers}>
      {loading ? (
        <div className="loader-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <HTMLFlipBook
            ref={flipbookRef}
            width={isMobile ? 320 : 550}
            height={isMobile ? 450 : 800}
            minWidth={250}
            minHeight={400}
            maxWidth={800}
            maxHeight={1000}
            size="fixed"
            startPage={0}
            drawShadow={true}
            flippingTime={600} // Faster flip effect
            showCover={false}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={!isMobile}
            style={{ margin: "auto" }}
            usePortrait={true}
            startZIndex={1}
            autoSize={true}
            className="flip-book"
            maxShadowOpacity={0.7} // Slightly softer shadows
            swipeDistance={isMobile ? 0.2 : 0.5}
            showPageCorners
            disableFlipByClick={false}
            onFlip={onPageChange}
          >
            {menuImages.map((image, index) => (
              <div className="page" key={index}>
                <img src={image} alt={`Menu Page ${index + 1}`} />
              </div>
            ))}
          </HTMLFlipBook>

          {/* Left Navigation Button */}
          {currentPage > 0 && (
            <button className="nav-button left" onClick={handlePrev}>
              &#9664;
            </button>
          )}

          {/* Right Navigation Button */}
          {currentPage < menuImages.length - 1 && (
            <button className="nav-button right" onClick={handleNext}>
              &#9654;
            </button>
          )}
        </>
      )}
      {/* Page Indicator */}
      <div className="page-indicator">
        Page {currentPage + 1} / {menuImages.length}
      </div>
    </div>
  );
};

export default MenuBook;
