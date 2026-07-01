import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../components/layout/dashboard-layout";

import Landing from "../pages/landing";
import Login from "../pages/login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Expense from "../pages/Expense";
import Categories from "../pages/Categories";
import Budgets from "../pages/Budgets";
import Reports from "../pages/Reports";
import AIInsights from "../pages/AIInsights";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="expenses" element={<Expense />} />

        <Route path="categories" element={<Categories />} />

        <Route path="budgets" element={<Budgets />} />

        <Route path="reports" element={<Reports />} />

        <Route path="ai-insights" element={<AIInsights />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Unknown Route */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}