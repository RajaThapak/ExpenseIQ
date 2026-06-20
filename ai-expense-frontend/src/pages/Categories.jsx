import { useState } from "react";

import AddCategoryModal from "../components/categories/add-category-modal";
import {
	CategoryDonutChart,
	CategoryIcon,
	Panel,
	PrimaryButton,
} from "../components/dashboard/dashboard-ui";
import { categories as initialCategories, formatINR } from "../data/mock-data";

export default function Categories() {
	const [modalOpen, setModalOpen] = useState(false);
	const [categoryList, setCategoryList] = useState(initialCategories);

	function handleSaveCategory(form) {
		const budget = Number(form.budgetLimit) || 0;
		const totalAmount = categoryList.reduce((sum, item) => sum + item.amount, 0) + budget;

		setCategoryList((current) => [
			...current,
			{
				name: form.name,
				amount: budget,
				percent: totalAmount > 0 ? Math.round((budget / totalAmount) * 100) : 0,
				color: form.color,
				icon: form.icon,
			},
		]);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-end">
				<PrimaryButton onClick={() => setModalOpen(true)}>Add Category</PrimaryButton>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{categoryList.map((category) => (
					<div
						key={category.name}
						className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
					>
						<CategoryIcon type={category.icon} color={category.color} />
						<h3 className="mt-4 text-base font-bold text-slate-900">{category.name}</h3>
						<p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
							{formatINR(category.amount)}
						</p>
						<p className="mt-1 text-sm font-medium text-slate-500">{category.percent}% of total spending</p>
						<div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
							<div
								className="h-full rounded-full"
								style={{ width: `${category.percent}%`, backgroundColor: category.color }}
							/>
						</div>
					</div>
				))}
			</div>

			<Panel title="Category Breakdown">
				<CategoryDonutChart data={categoryList} showCenter />
			</Panel>

			<AddCategoryModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSaveCategory}
			/>
		</div>
	);
}
