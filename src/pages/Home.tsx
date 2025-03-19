import React from "react";
import homeImage from "../assets/home-image.jpeg"; // Replace with your home page image
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={homeImage} alt="Granola" className="home-image" />
    </div>
  );
};

export default Home;
