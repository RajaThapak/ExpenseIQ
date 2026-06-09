import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing";
import Login from "../pages/login";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
}