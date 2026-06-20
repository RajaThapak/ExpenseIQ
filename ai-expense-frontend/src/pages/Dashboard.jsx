import {
	AIInsightCard,
	CategoryDonutChart,
	ExpenseRow,
	Panel,
	SpendingLineChart,
	StatCard,
} from "../components/dashboard/dashboard-ui";
import {
	CATEGORY_COLORS,
	categories,
	formatINR,
	monthlySpending,
	recentExpenses,
} from "../data/mock-data";

export default function Dashboard() {
	const enrichedRecent = recentExpenses.map((expense) => ({
		...expense,
		color: CATEGORY_COLORS[expense.category],
	}));

	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Total Spending"
					value={formatINR(24580)}
					trend="12.5% from last month"
					trendUp
				/>
				<StatCard
					label="This Month"
					value={formatINR(24580)}
					note="15 Apr – 15 May"
				/>
				<StatCard
					label="Savings"
					value={formatINR(8420)}
					trend="8.2% from last month"
					trendUp
				/>
				<StatCard label="Transactions" value="28" note="This month" />
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<Panel title="Spending by Category">
					<CategoryDonutChart data={categories} />
				</Panel>

				<Panel title="Monthly Spending">
					<SpendingLineChart data={monthlySpending} />
				</Panel>
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<Panel title="Recent Expenses">
					<div className="divide-y divide-slate-100">
						{enrichedRecent.map((expense) => (
							<ExpenseRow key={expense.name} expense={expense} />
						))}
					</div>
				</Panel>

				<AIInsightCard
					title="AI Insight"
					message="You spent 20% more on Food this month. Try cooking at home more often to save up to ₹2,000 next month."
				/>
			</div>
		</div>
	);
}
