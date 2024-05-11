import Register from "./views/Register";
import Login from "./views/Login";
import Products from "./views/Products";
import Dashboard from "./views/Dashboard";
import TodoList from "./views/TodoList";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "../context/UserContext";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <NavBar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/product" element={<Products />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
