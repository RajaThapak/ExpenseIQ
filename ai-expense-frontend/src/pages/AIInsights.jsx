import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function AIInsights() {
	return (
		<DashboardPageShell
			eyebrow="AI Insights"
			title="Smart recommendations"
			description="Surface actionable suggestions from your spending patterns in one place."
		>
			<div className="grid gap-4 lg:grid-cols-2">
				<InsightCard
					title="Dining out is rising"
					text="Your restaurant spending is up 18% over the last 30 days. Consider setting a tighter weekly cap."
				/>
				<InsightCard
					title="Subscriptions need pruning"
					text="You have three recurring services that have not been used in the last month."
				/>
			</div>
		</DashboardPageShell>
	);
}

function InsightCard({ title, text }) {
	return (
		<div className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
			<p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4f46e5]">Recommendation</p>
			<h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950">{title}</h2>
			<p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
		</div>
	);
}
