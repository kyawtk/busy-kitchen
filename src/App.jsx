import { Route, Routes } from "react-router-dom";
import "./App.css";
import Info from "./pages/Info";
//pages
import Home from "./pages/Home";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/recipes/:label' element={<Info/>}></Route>
        {/* <Route path="/favorites" element={<Favorites />}></Route> */}
      </Routes>
   
  );
}

export default App;
