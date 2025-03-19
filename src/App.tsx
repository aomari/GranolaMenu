import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MenuBook from "./components/MenuBook";

import ramallahMenu from "./assets/menu/ramallah";
import nablusMenu from "./assets/menu/nablus";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nablus" element={<MenuBook menuImages={nablusMenu} />} />
        <Route
          path="/ramallah"
          element={<MenuBook menuImages={ramallahMenu} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
