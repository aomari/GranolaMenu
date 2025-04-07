import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ramallah from "./pages/Ramallah";
import Nablus from "./pages/Nablus";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ramallah" element={<Ramallah />} />
          <Route path="/nablus" element={<Nablus />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
