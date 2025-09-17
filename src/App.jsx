import "./App.css";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Navigation/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  HomePage,
  MoviesPage,
  ShowsPage,
  PlatformsPage,
  StudiosPage,
  ActorsPage,
} from "./pages/index";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/actors" element={<ActorsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
