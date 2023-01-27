import Container from "@mui/material/Container";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviesSection from "./pages/MoviesSection";
import Search from "./pages/Search";
import TvSeries from "./pages/TvSeries";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/moviesSection" element={<MoviesSection />} />
            <Route path="/tvseries" element={<TvSeries />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
