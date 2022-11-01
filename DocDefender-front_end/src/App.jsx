import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Sign-In";
import Register from "./pages/Register";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
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
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
