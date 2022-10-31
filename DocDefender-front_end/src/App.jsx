import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Sign-In";
import Register from "./pages/Register";
import Log from "./pages/Log";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";

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
          <Route path="/user" element={<User />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
