import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layout/dashboard-layout";
import AIInsights from "../pages/AIInsights";
import Budgets from "../pages/Budgets";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/landing";
import Login from "../pages/login";
import Register from "../pages/Register";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Transactions from "../pages/Transactions";

const AUTH_KEY = "expenseiq-auth";

function RequireAuth() {
  const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Transactions />} />
          <Route path="categories" element={<Categories />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ai-insights" element={<AIInsights />} />
          
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}