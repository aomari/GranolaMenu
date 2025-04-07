import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from "react-responsive";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface MenuFlipbookProps {
  images: string[];
}

const MenuFlipbook: React.FC<MenuFlipbookProps> = ({ images }) => {
  //@ts-expect-error Ref is not null
  const bookRef = useRef<HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const totalPages = images.length;

  const nextPage = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh", // instead of 100vh
        bgcolor: "#121212",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingBottom: "env(safe-area-inset-bottom, 24px)", // protects from nav bar
      }}
    >
      {/* Flipbook wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          justifyContent: isMobile ? "center" : "center", // Centered on all
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <HTMLFlipBook
          width={isMobile ? window.innerWidth : 500}
          height={isMobile ? window.innerHeight : 550}
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={800}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onFlip}
          ref={bookRef}
          drawShadow
          flippingTime={600}
          clickEventForward
          useMouseEvents={!isMobile}
          usePortrait={isMobile}
          startZIndex={1}
          autoSize
          swipeDistance={isMobile ? 0.2 : 0.5}
          showPageCorners
          disableFlipByClick={false}
          maxShadowOpacity={0.5}
          startPage={0}
          className="menu-flipbook"
          style={{
            boxShadow: isMobile ? "none" : "0 0 20px rgba(0,0,0,0.5)",
            margin: "auto",
            cursor: "grab",
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="page"
              style={{
                background: "#fff",
                overflow: "auto",
                touchAction: "pinch-zoom", // mobile zoom
              }}
            >
              <img
                src={src}
                alt={`Menu Page ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "100%",
                  objectFit: "contain",
                  pointerEvents: "auto",
                }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </Box>

      {/* Navigation */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          py: 2,
          paddingBottom: "calc(env(safe-area-inset-bottom, 24px) + 8px)",
        }}
      >
        <IconButton onClick={prevPage} disabled={currentPage === 0}>
          <ArrowBackIosNewIcon
            sx={{
              color: currentPage === 0 ? "#888" : "#4CAF50",
              transition: "color 0.3s ease",
            }}
          />
        </IconButton>
        <Typography variant="body2" color="#fff">
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <IconButton
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
        >
          <ArrowForwardIosIcon
            sx={{
              color: currentPage === images.length - 1 ? "#888" : "#4CAF50",
              transition: "color 0.3s ease",
            }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MenuFlipbook;
