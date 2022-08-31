import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Sign-In";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
