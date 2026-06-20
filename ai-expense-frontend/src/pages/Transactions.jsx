import {
	CategoryDonutChart,
	CategoryIcon,
	Panel,
	PrimaryButton,
	SpendingBarChart,
	StatCard,
} from "../components/dashboard/dashboard-ui";
import {
	CATEGORY_COLORS,
	allExpenses,
	categories,
	dailySpending,
	formatINR,
} from "../data/mock-data";

export default function Transactions() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-1 flex-wrap items-center gap-3">
					<div className="relative min-w-[200px] flex-1 sm:max-w-xs">
						<SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="search"
							placeholder="Search expenses..."
							className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
						/>
					</div>
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
						aria-label="Filter"
					>
						<FilterIcon />
					</button>
					<button
						type="button"
						className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
					>
						<CalendarIcon />
						15 Apr – 15 May
					</button>
				</div>
				<PrimaryButton>Add Expense</PrimaryButton>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard label="Today" value={formatINR(1250)} />
				<StatCard label="This Week" value={formatINR(3850)} trend="4.5%" trendUp />
				<StatCard label="This Month" value={formatINR(24580)} trend="12.5%" trendUp />
				<StatCard label="Total" value={formatINR(124580)} />
			</div>

			<Panel title="All Expenses">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[640px] text-left text-sm">
						<thead>
							<tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
								<th className="pb-3 pr-4 font-semibold">Expense</th>
								<th className="pb-3 pr-4 font-semibold">Category</th>
								<th className="pb-3 pr-4 font-semibold">Amount</th>
								<th className="pb-3 pr-4 font-semibold">Date</th>
								<th className="pb-3 font-semibold">Payment</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-50">
							{allExpenses.map((expense) => (
								<tr key={`${expense.name}-${expense.date}`} className="text-slate-700">
									<td className="py-4 pr-4">
										<div className="flex items-center gap-3">
											<CategoryIcon
												type={expense.icon}
												color={CATEGORY_COLORS[expense.category]}
												size="sm"
											/>
											<span className="font-semibold text-slate-900">{expense.name}</span>
										</div>
									</td>
									<td className="py-4 pr-4">{expense.category}</td>
									<td className="py-4 pr-4 font-bold text-slate-900">{formatINR(expense.amount)}</td>
									<td className="py-4 pr-4 text-slate-500">{expense.date}</td>
									<td className="py-4">
										<span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
											{expense.payment}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Panel>

			<div className="grid gap-6 xl:grid-cols-2">
				<Panel title="Expense Analytics">
					<CategoryDonutChart data={categories} />
				</Panel>
				<Panel title="Daily Spending">
					<SpendingBarChart data={dailySpending} />
				</Panel>
			</div>
		</div>
	);
}

function SearchIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
			<path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function FilterIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}
