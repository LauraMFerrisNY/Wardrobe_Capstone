import { Routes, Route } from "react-router-dom";
import "./stylesheets/app.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./login";
import Register from "./Register";
import AddItem from "./elements/AddItem";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddItem" element={<AddItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
