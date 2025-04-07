import MenuFlipbook from "../components/MenuBook";

const ramallahImages = Array.from(
  { length: 16 }, // Adjust length to match the number of images
  (_, i) =>
    `/images/Ramallah/Granola Menu Ramallah price-${i
      .toString()
      .padStart(2, "0")}.jpg`
);

console.log(ramallahImages);
const Ramallah: React.FC = () => {
  return <MenuFlipbook images={ramallahImages} />;
};

export default Ramallah;
