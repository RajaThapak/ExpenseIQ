import { useMemo, useState } from "react";

import {
	CategoryDonutChart,
	CategoryIcon,
	PrimaryButton,
	SpendingBarChart,
} from "../components/dashboard/dashboard-ui";
import AddExpenseModal from "../components/expenses/add-expense-modal";
import {
	CATEGORY_COLORS,
	categories,
	formatINR,
} from "../data/mock-data";

const CATEGORY_ICONS = {
	"Food & Dining": "food",
	Transport: "transport",
	Shopping: "shopping",
	"Bills & Utilities": "bills",
	Entertainment: "entertainment",
	Health: "health",
};

const INITIAL_EXPENSES = [
	{ name: "Lunch at Cafe", category: "Food & Dining", amount: 450, date: "15 May 2024", payment: "UPI", icon: "food" },
	{ name: "Uber Ride", category: "Transport", amount: 280, date: "15 May 2024", payment: "UPI", icon: "transport" },
	{ name: "Amazon Shopping", category: "Shopping", amount: 1299, date: "14 May 2024", payment: "Card", icon: "shopping" },
	{ name: "Electricity Bill", category: "Bills & Utilities", amount: 1670, date: "14 May 2024", payment: "Netbanking", icon: "bills" },
	{ name: "Movie Ticket", category: "Entertainment", amount: 450, date: "13 May 2024", payment: "UPI", icon: "entertainment" },
	{ name: "Fuel", category: "Transport", amount: 1200, date: "12 May 2024", payment: "Card", icon: "transport" },
	{ name: "Grocery", category: "Shopping", amount: 860, date: "12 May 2024", payment: "UPI", icon: "shopping" },
	{ name: "Dinner with Friends", category: "Food & Dining", amount: 650, date: "11 May 2024", payment: "UPI", icon: "food" },
];

const STATS = [
	{ label: "Today", value: formatINR(1250) },
	{ label: "This Week", value: formatINR(3850), trend: "+4.5%" },
	{ label: "This Month", value: formatINR(24580), trend: "+12.5%" },
	{ label: "Total", value: formatINR(124580) },
];

const WEEKLY_SPENDING = [
	{ day: "Mon", amount: 7800 },
	{ day: "Tue", amount: 12000 },
	{ day: "Wed", amount: 6400 },
	{ day: "Thu", amount: 10200 },
	{ day: "Sat", amount: 14200 },
	{ day: "Sun", amount: 12300 },
];

export default function Expense() {
	const [modalOpen, setModalOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

	const filteredExpenses = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) return expenses;

		return expenses.filter((expense) =>
			[expense.name, expense.category, expense.payment, expense.date]
				.join(" ")
				.toLowerCase()
				.includes(query)
		);
	}, [expenses, search]);

	function handleSaveExpense(expense) {
		setExpenses((current) => [
			{
				...expense,
				icon: CATEGORY_ICONS[expense.category] ?? "food",
			},
			...current,
		]);
	}

	return (
		<section className="rounded-[1.75rem] border border-slate-200/70 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
			<div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<h1 className="text-2xl font-bold text-slate-950">Expenses</h1>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<div className="relative w-full sm:w-72">
						<SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search expenses..."
							className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
						/>
					</div>

					<button
						type="button"
						className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
					>
						<FilterIcon />
						Filter
						<ChevronDownIcon />
					</button>

					<button
						type="button"
						className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
					>
						<CalendarIcon />
						15 Apr - 15 May
						<ChevronDownIcon />
					</button>

					<PrimaryButton className="h-12 px-5 shadow-[0_12px_28px_rgba(99,102,241,0.24)]" onClick={() => setModalOpen(true)}>
						Add Expense
					</PrimaryButton>
				</div>
			</div>

			<div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{STATS.map((stat) => (
					<div key={stat.label} className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
						<p className="text-sm font-semibold text-slate-500">{stat.label}</p>
						<div className="mt-3 flex items-end gap-3">
							<p className="text-2xl font-extrabold tracking-tight text-slate-950">{stat.value}</p>
							{stat.trend ? <p className="pb-1 text-xs font-bold text-emerald-600">{stat.trend}</p> : null}
						</div>
					</div>
				))}
			</div>

			<div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
				<h2 className="mb-5 text-lg font-bold text-slate-950">All Expenses</h2>
				<div className="max-h-[28rem] overflow-auto rounded-xl border border-slate-100">
					<table className="w-full min-w-[720px] text-left text-sm">
						<thead className="sticky top-0 z-10 bg-white">
							<tr className="border-b border-slate-100 text-xs font-bold text-slate-500 shadow-[0_1px_0_rgba(226,232,240,0.8)]">
								<th className="px-4 py-3">Expense</th>
								<th className="px-4 py-3">Category</th>
								<th className="px-4 py-3">Amount</th>
								<th className="px-4 py-3">Date</th>
								<th className="px-4 py-3">Payment</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filteredExpenses.map((expense) => (
								<tr key={`${expense.name}-${expense.date}-${expense.amount}`} className="text-slate-700">
									<td className="px-4 py-4">
										<div className="flex min-w-0 items-center gap-3">
											<CategoryIcon
												type={expense.icon}
												color={CATEGORY_COLORS[expense.category] ?? "#6366f1"}
												size="sm"
											/>
											<span className="truncate font-bold text-slate-900">{expense.name}</span>
										</div>
									</td>
									<td className="px-4 py-4 font-medium">{expense.category}</td>
									<td className="px-4 py-4 font-extrabold text-slate-950">{formatINR(expense.amount)}</td>
									<td className="px-4 py-4 font-medium text-slate-600">{expense.date}</td>
									<td className="px-4 py-4 font-medium text-slate-600">{expense.payment}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
				<div className="mb-5 flex items-center justify-between gap-4">
					<h2 className="text-lg font-bold text-slate-950">Expense Analytics</h2>
					<button
						type="button"
						className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
					>
						This Month
						<ChevronDownIcon />
					</button>
				</div>

				<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<CategoryDonutChart data={categories} />
					<SpendingBarChart data={WEEKLY_SPENDING} color="#6d28d9" />
				</div>
			</div>

			<AddExpenseModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSaveExpense}
			/>
		</section>
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

function ChevronDownIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400" aria-hidden="true">
			<path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
