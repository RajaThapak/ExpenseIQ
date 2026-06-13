import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Categories() {
  return (
    <DashboardPageShell
      eyebrow="Categories"
      title="Organize your spending"
      description="Group transactions into meaningful categories and keep your dashboard easy to scan."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Food & Dining" value="$1,240" tone="from-amber-100 to-orange-50" />
        <StatCard label="Transport" value="$420" tone="from-sky-100 to-cyan-50" />
        <StatCard label="Subscriptions" value="$186" tone="from-violet-100 to-fuchsia-50" />
      </div>
    </DashboardPageShell>
  );
}

function StatCard({ label, value, tone }) {
  return (
    <div className={`rounded-[1.5rem] bg-gradient-to-br ${tone} p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]`}>
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950">{value}</p>
    </div>
  );
}