import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Settings() {
  return (
    <DashboardPageShell
      eyebrow="Settings"
      title="Personalize your workspace"
      description="Tune the experience, manage access, and keep your dashboard focused on what matters."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SettingCard title="Profile" text="Update your name, email, and profile details." />
        <SettingCard title="Notifications" text="Choose which alerts and insights you want to receive." />
      </div>
    </DashboardPageShell>
  );
}

function SettingCard({ title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}