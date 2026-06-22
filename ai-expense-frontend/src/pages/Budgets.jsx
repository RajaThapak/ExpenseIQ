import { useState } from "react";

import CreateBudgetModal from "../components/budgets/create-budget-modal";
import {
	AIInsightCard,
	BudgetComparisonChart,
	CategoryIcon,
	Panel,
	PrimaryButton,
} from "../components/dashboard/dashboard-ui";
import { budgets, formatINR } from "../data/mock-data";

export default function Budgets() {
	const [modalOpen, setModalOpen] = useState(false);
	const chartData = budgets.map((item) => ({
		name: item.name.split(" ")[0],
		budget: item.budget,
		spent: item.spent,
	}));

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-end">
				<PrimaryButton onClick={() => setModalOpen(true)}>Create Budget</PrimaryButton>
			</div>

			<Panel title="Budget Progress">
				<div className="space-y-5">
					{budgets.map((item) => {
						const percent = Math.round((item.spent / item.budget) * 100);
						const isOverBudget = percent >= 90;

						return (
							<div key={item.name}>
								<div className="mb-2 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3">
										<CategoryIcon type={item.icon} color={item.color} size="sm" />
										<span className="font-semibold text-slate-900">{item.name}</span>
									</div>
									<span className="text-sm font-medium text-slate-600">
										{formatINR(item.spent)} / {formatINR(item.budget)}
									</span>
								</div>
								<div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
									<div
										className="h-full rounded-full transition-all"
										style={{
											width: `${Math.min(percent, 100)}%`,
											backgroundColor: isOverBudget ? "#ef4444" : item.color,
										}}
									/>
								</div>
								<p className="mt-1.5 text-xs text-slate-400">{percent}% used</p>
							</div>
						);
					})}
				</div>
			</Panel>

			<div className="grid gap-6 xl:grid-cols-2">
				<Panel title="Budget vs Actual">
					<BudgetComparisonChart data={chartData} />
					<div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
						<span className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-sm bg-indigo-200" />
							Budget
						</span>
						<span className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
							Actual
						</span>
					</div>
				</Panel>

				<AIInsightCard
					title="Budget Assistant"
					message="You are close to exceeding your Food & Dining budget. Recommended daily limit ₹100 / day."
				/>
			</div>

			<CreateBudgetModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</div>
	);
}
