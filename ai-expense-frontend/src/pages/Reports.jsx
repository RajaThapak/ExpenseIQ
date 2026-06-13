import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Reports() {
  return (
    <DashboardPageShell
      eyebrow="Reports"
      title="Review your monthly trends"
      description="See a clean summary of what changed over time so you can act on the numbers."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/65">Spending curve</p>
          <div className="mt-6 flex h-40 items-end gap-3">
            {[42, 58, 38, 74, 62, 88, 66].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-[linear-gradient(180deg,#b4ff1f_0%,#6d28d9_100%)]" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200/70 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold text-slate-500">Highlights</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Food spending is down 12% vs last month.</li>
            <li>Subscription costs increased by 8%.</li>
            <li>Travel is staying within the budget range.</li>
          </ul>
        </div>
      </div>
    </DashboardPageShell>
  );
}