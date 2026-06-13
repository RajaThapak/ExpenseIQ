import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ff_0%,#f8fafc_100%)] lg:flex">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:w-72">
        <Sidebar />
      </div>

      <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}