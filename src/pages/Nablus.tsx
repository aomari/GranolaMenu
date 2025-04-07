import MenuFlipbook from "../components/MenuBook";

const nablusImages = Array.from(
  { length: 16 }, // Adjust length to match the number of images
  (_, i) =>
    `/images/Nablus/Granola Menu Nablus price-${i
      .toString()
      .padStart(2, "0")}.jpg`
);

const Nablus: React.FC = () => {
  return <MenuFlipbook images={nablusImages} />;
};

export default Nablus;
