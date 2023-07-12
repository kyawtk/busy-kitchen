import { Route, Routes } from "react-router-dom";
import "./App.css";
import Info from "./pages/Info";
//pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recipes/:label" element={<Info />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </>
  );
}

export default App;
