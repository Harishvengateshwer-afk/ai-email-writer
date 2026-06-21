import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import History from "./pages/History";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <div className="logo">
          AI Email Writer
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/history">
            History
          </Link>

        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/history"
          element={<History />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;