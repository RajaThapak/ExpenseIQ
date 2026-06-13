import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Budgets() {
  return (
    <DashboardPageShell
      eyebrow="Budgets"
      title="Stay on top of limits"
      description="Monitor monthly caps and see where you still have room to spend."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <BudgetCard name="Home" amount="$1,100" progress="78%" />
        <BudgetCard name="Entertainment" amount="$320" progress="54%" />
      </div>
    </DashboardPageShell>
  );
}

function BudgetCard({ name, amount, progress }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">Budget</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">{name}</h2>
        </div>
        <p className="text-lg font-bold text-[#4f46e5]">{amount}</p>
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div className="h-3 rounded-full bg-[linear-gradient(90deg,#5b4bff_0%,#6d28d9_100%)]" style={{ width: progress }} />
      </div>

      <p className="mt-3 text-sm font-medium text-slate-500">Used {progress} of this budget</p>
    </div>
  );
}