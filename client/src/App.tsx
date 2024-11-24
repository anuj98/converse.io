import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { Login } from "./components/login/login";
import { Register } from "./components/register/Register";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, getUsers, isAuthenticating } = useAuthStore();

  useEffect(() => {
    checkAuth();
    getUsers();
  }, [checkAuth]);

  if (isAuthenticating && !authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={authUser ? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
