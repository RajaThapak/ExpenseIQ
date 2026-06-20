import {
	CategoryDonutChart,
	CircularGauge,
	Panel,
	PrimaryButton,
	SelectDropdown,
	SpendingTrendChart,
	StatCard,
} from "../components/dashboard/dashboard-ui";
import { formatINR, reportCategories, spendingTrend } from "../data/mock-data";

export default function Reports() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap items-center gap-3">
					<SelectDropdown value="This Month" options={["This Month", "Last Month", "Last 3 Months", "This Year"]} />
					<SelectDropdown
						value="All Categories"
						options={["All Categories", "Food & Dining", "Transport", "Shopping", "Bills & Utilities"]}
					/>
				</div>
				<PrimaryButton icon="export">Export</PrimaryButton>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard label="Total Spending" value={formatINR(24580)} trend="12.5%" trendUp />
				<StatCard label="Total Savings" value={formatINR(8420)} trend="18.2%" trendUp />
				<StatCard label="Total Income" value={formatINR(40000)} trend="15.2%" trendUp />
				<StatCard label="Transactions" value="28" trend="+3" trendUp />
			</div>

			<Panel title="Spending Trend">
				<SpendingTrendChart data={spendingTrend} />
			</Panel>

			<div className="grid gap-6 xl:grid-cols-2">
				<Panel title="Category Breakdown">
					<CategoryDonutChart data={reportCategories} />
				</Panel>

				<Panel title="Budget Performance">
					<div className="flex flex-col items-center justify-center py-4">
						<CircularGauge
							percent={75}
							sublabel="Great! You're within budget. You've saved ₹8,420 this month."
						/>
					</div>
				</Panel>
			</div>

			<Panel title="Download Reports">
				<div className="grid gap-3 sm:grid-cols-3">
					<DownloadButton label="Download PDF" icon="pdf" />
					<DownloadButton label="Download Excel" icon="excel" />
					<DownloadButton label="Download CSV" icon="csv" />
				</div>
			</Panel>
		</div>
	);
}

function DownloadButton({ label, icon }) {
	const icons = {
		pdf: (
			<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-red-500" aria-hidden="true">
				<path d="M8 4h8l4 4v12H8V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
				<path d="M16 4v4h4M10 13h4M10 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		),
		excel: (
			<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-600" aria-hidden="true">
				<path d="M8 4h8l4 4v12H8V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
				<path d="M16 4v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
				<path d="m10 13 4 4M14 13l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		),
		csv: (
			<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-500" aria-hidden="true">
				<path d="M8 4h8l4 4v12H8V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
				<path d="M16 4v4h4M10 13h4M10 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		),
	};

	return (
		<button
			type="button"
			className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
		>
			{icons[icon]}
			{label}
		</button>
	);
}
