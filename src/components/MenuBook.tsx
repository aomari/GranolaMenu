import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSwipeable } from "react-swipeable";
import { useMediaQuery } from "react-responsive";
import { ClipLoader } from "react-spinners";
import "./MenuBook.css";

interface MenuBookProps {
  menuImages: string[];
}

const MenuBook: React.FC<MenuBookProps> = ({ menuImages }) => {
  //@ts-expect-error Ref is not null
  const flipbookRef = useRef<HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

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

    Promise.all(
      images.map((img) => new Promise((resolve) => (img.onload = resolve)))
    ).then(() => {
      setLoading(false);
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [menuImages]);

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
            flippingTime={600}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={!isMobile}
            style={{ margin: "auto" }}
            usePortrait={true}
            startZIndex={1}
            autoSize={true}
            className="flip-book"
            maxShadowOpacity={0.7}
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

          {currentPage > 0 && (
            <button className="nav-button left" onClick={handlePrev}>
              &#9664;
            </button>
          )}

          {currentPage < menuImages.length - 1 && (
            <button className="nav-button right" onClick={handleNext}>
              &#9654;
            </button>
          )}
        </>
      )}
      <div className="page-indicator">
        Page {currentPage + 1} / {menuImages.length}
      </div>
    </div>
  );
};

export default MenuBook;
