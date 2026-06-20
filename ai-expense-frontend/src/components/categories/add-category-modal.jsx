import { useEffect, useState } from "react";

const CATEGORY_TYPES = ["Expense", "Fixed Expense", "Variable Expense", "Income"];

const ICON_OPTIONS = [
	{ id: "food", label: "Food & Dining", emoji: "🍽" },
	{ id: "transport", label: "Transport", emoji: "🚗" },
	{ id: "shopping", label: "Shopping", emoji: "🛍" },
	{ id: "bills", label: "Bills & Utilities", emoji: "💡" },
	{ id: "entertainment", label: "Entertainment", emoji: "🎬" },
	{ id: "health", label: "Health", emoji: "💊" },
];

const PRESET_COLORS = ["#3B82F6", "#22C55E", "#8B5CF6", "#F97316", "#EC4899", "#94A3B8"];

const INITIAL_FORM = {
	name: "",
	type: "",
	description: "",
	icon: "food",
	color: "#3B82F6",
	budgetLimit: "",
	sortOrder: "0",
	active: true,
};

export default function AddCategoryModal({ open, onClose, onSave }) {
	const [form, setForm] = useState(INITIAL_FORM);
	const [iconOpen, setIconOpen] = useState(false);

	useEffect(() => {
		if (!open) {
			setForm(INITIAL_FORM);
			setIconOpen(false);
		}
	}, [open]);

	useEffect(() => {
		if (!open) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);

	if (!open) return null;

	const selectedIcon = ICON_OPTIONS.find((option) => option.id === form.icon) ?? ICON_OPTIONS[0];
	const descriptionLength = form.description.length;

	function updateField(field, value) {
		setForm((current) => ({ ...current, [field]: value }));
	}

	function handleSubmit(event) {
		event.preventDefault();
		onSave?.(form);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button
				type="button"
				className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
				onClick={onClose}
				aria-label="Close modal"
			/>

			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="add-category-title"
				className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
			>
				<div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
					<div className="flex items-start gap-3">
						<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
							<FolderIcon />
						</span>
						<div>
							<h2 id="add-category-title" className="text-lg font-bold text-slate-900">
								Add Category
							</h2>
							<p className="mt-0.5 text-sm text-slate-500">
								Create a new category to organize your expenses
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
						aria-label="Close"
					>
						<CloseIcon />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
					<div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
						<div className="grid gap-5 sm:grid-cols-2">
							<Field label="Category Name" required>
								<input
									type="text"
									required
									value={form.name}
									onChange={(event) => updateField("name", event.target.value)}
									placeholder="e.g., Food & Dining"
									className={inputClass}
								/>
							</Field>

							<Field label="Category Type" required>
								<select
									required
									value={form.type}
									onChange={(event) => updateField("type", event.target.value)}
									className={inputClass}
								>
									<option value="" disabled>
										Select type
									</option>
									{CATEGORY_TYPES.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</Field>
						</div>

						<Field label="Description">
							<div className="relative">
								<textarea
									value={form.description}
									onChange={(event) => {
										if (event.target.value.length <= 150) {
											updateField("description", event.target.value);
										}
									}}
									placeholder="Brief description of this category..."
									rows={3}
									className={`${inputClass} resize-none pb-7`}
								/>
								<span className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-slate-400">
									{descriptionLength}/150
								</span>
							</div>
						</Field>

						<div className="grid gap-5 sm:grid-cols-2">
							<Field label="Icon" hint="Choose an icon that represents this category">
								<div className="relative">
									<button
										type="button"
										onClick={() => setIconOpen((open) => !open)}
										className={`${inputClass} flex w-full items-center justify-between text-left`}
									>
										<span className="flex items-center gap-2">
											<span
												className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-blue-500 text-base"
												style={{ backgroundColor: `${form.color}18` }}
											>
												{selectedIcon.emoji}
											</span>
											<span className="text-sm text-slate-700">{selectedIcon.label}</span>
										</span>
										<ChevronIcon />
									</button>

									{iconOpen ? (
										<ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
											{ICON_OPTIONS.map((option) => (
												<li key={option.id}>
													<button
														type="button"
														onClick={() => {
															updateField("icon", option.id);
															setIconOpen(false);
														}}
														className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
													>
														<span className="text-base">{option.emoji}</span>
														{option.label}
													</button>
												</li>
											))}
										</ul>
									) : null}
								</div>
							</Field>

							<Field label="Color">
								<div className="space-y-3">
									<div className="relative">
										<span
											className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
											style={{ backgroundColor: form.color }}
										/>
										<input
											type="text"
											value={form.color}
											onChange={(event) => updateField("color", event.target.value)}
											className={`${inputClass} pl-10 uppercase`}
											maxLength={7}
										/>
									</div>
									<div className="flex flex-wrap gap-2">
										{PRESET_COLORS.map((color) => (
											<button
												key={color}
												type="button"
												onClick={() => updateField("color", color)}
												className={`h-7 w-7 rounded-full transition ring-offset-2 hover:scale-105 ${
													form.color.toUpperCase() === color ? "ring-2 ring-slate-400" : ""
												}`}
												style={{ backgroundColor: color }}
												aria-label={`Select color ${color}`}
											/>
										))}
									</div>
								</div>
							</Field>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<Field label="Budget Limit (Optional)" hint="Set monthly budget limit for this category">
								<div className="relative">
									<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
										₹
									</span>
									<input
										type="number"
										min="0"
										step="0.01"
										value={form.budgetLimit}
										onChange={(event) => updateField("budgetLimit", event.target.value)}
										placeholder="0.00"
										className={`${inputClass} pl-8`}
									/>
								</div>
							</Field>

							<Field label="Sort Order" hint="Display order in category list">
								<input
									type="number"
									min="0"
									value={form.sortOrder}
									onChange={(event) => updateField("sortOrder", event.target.value)}
									className={inputClass}
								/>
							</Field>
						</div>

						<div>
							<label className="flex cursor-pointer items-start gap-3">
								<span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
									<input
										type="checkbox"
										checked={form.active}
										onChange={(event) => updateField("active", event.target.checked)}
										className="peer sr-only"
									/>
									<span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-[#3B82F6]" />
									<span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
								</span>
								<span>
									<span className="text-sm font-semibold text-slate-900">Active</span>
									<p className="mt-0.5 text-xs text-slate-500">
										Category will be visible and can be used
									</p>
								</span>
							</label>
						</div>
					</div>

					<div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
						<button
							type="button"
							onClick={onClose}
							className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
						>
							<SaveIcon />
							Save Category
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const inputClass =
	"w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

function Field({ label, required, hint, children }) {
	return (
		<div>
			<label className="mb-1.5 block text-sm font-semibold text-slate-800">
				{label}
				{required ? <span className="text-red-500"> *</span> : null}
			</label>
			{children}
			{hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
		</div>
	);
}

function FolderIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path
				d="M4 7.5A1.5 1.5 0 0 1 5.5 6H9l1.5 2H18.5A1.5 1.5 0 0 1 20 9.5v7A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function ChevronIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400" aria-hidden="true">
			<path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function SaveIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path d="M5 5h14v14H5V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
			<path d="M8 5v4h8V5M8 15h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}
