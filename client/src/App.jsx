import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { Plan } from "./pages/Plan";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};
export default App;
