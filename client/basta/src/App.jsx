import Register from "./views/Register";
import Login from "./views/Login";
import Products from "./views/Products";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "../context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserContextProvider>
      <NavBar />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
