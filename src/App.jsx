import { Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar"
import Home from "./Home"

function App() {
    return (
      <div className="App">
      <Navbar />
        <div className="content">
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
        </div>
    </div>
    );
}

export default App;