import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Dashboard() {
	return (
		<DashboardPageShell
			eyebrow="Dashboard"
			title="Your money at a glance"
			description="Track spending, review category balance, and jump into AI insights from the same shell."
		>
			<div className="grid gap-4 md:grid-cols-3">
				<InfoCard label="This month" value="$4,820" note="12% below last month" />
				<InfoCard label="Budget used" value="68%" note="Across all categories" />
				<InfoCard label="Insights" value="9" note="New recommendations ready" />
			</div>
		</DashboardPageShell>
	);
}

function InfoCard({ label, value, note }) {
	return (
		<div className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
			<p className="text-sm font-semibold text-slate-500">{label}</p>
			<p className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950">{value}</p>
			<p className="mt-2 text-sm text-slate-500">{note}</p>
		</div>
	);
}
