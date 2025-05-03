import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
