import DashboardPageShell from "../components/layout/dashboard-page-shell";

export default function Transactions() {
	return (
		<DashboardPageShell
			eyebrow="Expenses"
			title="Recent transactions"
			description="Review the latest spending activity and keep the dashboard synced with real data later."
		>
			<div className="space-y-3">
				{[
					["Groceries", "$82.40", "Today"],
					["Ride share", "$14.80", "Yesterday"],
					["Streaming", "$12.99", "2 days ago"],
				].map(([name, amount, time]) => (
					<div key={name} className="flex items-center justify-between rounded-[1.4rem] border border-slate-200/70 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
						<div>
							<p className="font-semibold text-slate-950">{name}</p>
							<p className="text-sm text-slate-500">{time}</p>
						</div>
						<p className="text-lg font-bold text-slate-950">{amount}</p>
					</div>
				))}
			</div>
		</DashboardPageShell>
	);
}
