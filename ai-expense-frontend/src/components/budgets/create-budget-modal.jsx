import { useEffect, useState } from "react";

const CATEGORIES = [
	"Food & Groceries",
	"Transport",
	"Shopping",
	"Bills & Utilities",
	"Entertainment",
	"Health",
];

const PERIODS = ["Monthly", "Weekly", "Quarterly", "Yearly"];
const ALERT_LEVELS = ["70%", "80%", "90%"];
const EXCEED_LEVELS = ["100%", "110%", "120%"];

const INITIAL_FORM = {
	name: "",
	amount: "",
	category: "Food & Groceries",
	period: "Monthly",
	startDate: "2025-05-22",
	endDate: "2025-06-22",
	description: "",
	warnEnabled: true,
	warnAt: "80%",
	exceedEnabled: true,
	exceedAt: "100%",
};

export default function CreateBudgetModal({ open, onClose, onSave }) {
	if (!open) return null;

	return <CreateBudgetModalContent onClose={onClose} onSave={onSave} />;
}

function CreateBudgetModalContent({ onClose, onSave }) {
	const [form, setForm] = useState(INITIAL_FORM);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	function updateField(field, value) {
		setForm((current) => ({ ...current, [field]: value }));
	}

	function handleSubmit(event) {
		event.preventDefault();
		onSave?.({
			...form,
			amount: Number(form.amount),
		});
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="create-budget-title"
				className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_28px_90px_rgba(15,23,42,0.32)]"
			>
				<div className="flex items-start justify-between gap-6 px-6 pb-4 pt-6 sm:px-10 sm:pt-10">
					<div className="flex items-start gap-5">
						<span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.7rem] bg-emerald-50 text-emerald-600">
							<WalletIcon className="h-10 w-10" />
						</span>
						<div>
							<h2 id="create-budget-title" className="text-3xl font-extrabold tracking-tight text-slate-950">
								Create Budget
							</h2>
							<p className="mt-2 text-base leading-7 text-slate-500">
								Set a budget to track your spending and achieve your financial goals.
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
						aria-label="Close create budget modal"
					>
						<CloseIcon className="h-7 w-7" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pb-6 sm:px-10 sm:pb-10">
					<div className="grid gap-x-6 gap-y-7 pt-4 lg:grid-cols-2">
						<Field label="Budget Name" required>
							<input
								type="text"
								required
								value={form.name}
								onChange={(event) => updateField("name", event.target.value)}
								placeholder="e.g. Monthly Groceries Budget"
								className={inputClass}
							/>
						</Field>

						<Field label="Budget Amount" required>
							<div className="relative">
								<span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-800">
									Rs.
								</span>
								<input
									type="number"
									required
									min="1"
									step="1"
									value={form.amount}
									onChange={(event) => updateField("amount", event.target.value)}
									placeholder="0.00"
									className={`${inputClass} pl-16`}
								/>
							</div>
						</Field>

						<Field label="Category" required>
							<div className="relative">
								<CategoryIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
								<select
									required
									value={form.category}
									onChange={(event) => updateField("category", event.target.value)}
									className={`${inputClass} appearance-none pl-16 pr-12`}
								>
									{CATEGORIES.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
								<ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
							</div>
						</Field>

						<Field label="Budget Period" required>
							<div className="relative">
								<CalendarIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
								<select
									required
									value={form.period}
									onChange={(event) => updateField("period", event.target.value)}
									className={`${inputClass} appearance-none pl-16 pr-12`}
								>
									{PERIODS.map((period) => (
										<option key={period} value={period}>
											{period}
										</option>
									))}
								</select>
								<ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
							</div>
						</Field>

						<Field label="Start Date" required>
							<div className="relative">
								<CalendarIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
								<input
									type="date"
									required
									value={form.startDate}
									onChange={(event) => updateField("startDate", event.target.value)}
									className={`${inputClass} pl-16`}
								/>
							</div>
						</Field>

						<Field label="End Date" required>
							<div className="relative">
								<CalendarIcon className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
								<input
									type="date"
									required
									value={form.endDate}
									onChange={(event) => updateField("endDate", event.target.value)}
									className={`${inputClass} pl-16`}
								/>
							</div>
						</Field>

						<Field label="Description (Optional)" className="lg:col-span-2">
							<div className="relative">
								<textarea
									value={form.description}
									onChange={(event) => {
										if (event.target.value.length <= 200) {
											updateField("description", event.target.value);
										}
									}}
									placeholder="Add a note about this budget..."
									rows={4}
									className={`${inputClass} min-h-28 resize-none pb-9`}
								/>
								<span className="pointer-events-none absolute bottom-4 right-5 text-sm text-slate-500">
									{form.description.length}/200
								</span>
							</div>
						</Field>
					</div>

					<div className="mt-8">
						<h3 className="text-lg font-extrabold text-slate-950">
							Budget Alerts <span className="font-medium">(Optional)</span>
						</h3>
						<p className="mt-2 text-sm text-slate-500">
							Get notified when you are close to or exceed your budget
						</p>

						<div className="mt-4 rounded-2xl border border-slate-200 p-4 sm:p-5">
							<AlertRow
								checked={form.warnEnabled}
								onCheckedChange={(checked) => updateField("warnEnabled", checked)}
								label="Warn me when I reach"
								value={form.warnAt}
								options={ALERT_LEVELS}
								onValueChange={(value) => updateField("warnAt", value)}
							/>
							<AlertRow
								checked={form.exceedEnabled}
								onCheckedChange={(checked) => updateField("exceedEnabled", checked)}
								label="Alert me when I exceed"
								value={form.exceedAt}
								options={EXCEED_LEVELS}
								onValueChange={(value) => updateField("exceedAt", value)}
							/>
						</div>
					</div>

					<div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
						<button
							type="button"
							onClick={onClose}
							className="h-12 rounded-xl border border-slate-200 bg-white px-9 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-emerald-600 px-8 text-base font-bold text-white shadow-[0_12px_28px_rgba(5,150,105,0.24)] transition hover:bg-emerald-700"
						>
							<WalletIcon className="h-5 w-5" />
							Create Budget
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Field({ label, required, className = "", children }) {
	return (
		<label className={`block ${className}`}>
			<span className="mb-3 block text-base font-bold text-slate-950">
				{label} {required ? <span className="text-red-500">*</span> : null}
			</span>
			{children}
		</label>
	);
}

function AlertRow({ checked, onCheckedChange, label, value, options, onValueChange }) {
	return (
		<div className="flex flex-wrap items-center gap-4 py-3 text-base text-slate-950">
			<label className="flex cursor-pointer items-center gap-4">
				<span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
					<input
						type="checkbox"
						checked={checked}
						onChange={(event) => onCheckedChange(event.target.checked)}
						className="peer sr-only"
					/>
					<span className="h-6 w-6 rounded-md border border-slate-300 bg-white transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600" />
					<CheckIcon className="pointer-events-none absolute h-4 w-4 text-white opacity-0 transition peer-checked:opacity-100" />
				</span>
				<span>{label}</span>
			</label>

			<select
				value={value}
				onChange={(event) => onValueChange(event.target.value)}
				className="h-12 rounded-xl border border-slate-200 bg-white px-5 text-base font-semibold text-slate-950 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<span>of my budget</span>
		</div>
	);
}

function WalletIcon({ className = "h-6 w-6" }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M4 7.5h13.5A2.5 2.5 0 0 1 20 10v7.5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
			<path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H17v4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
			<path d="M17 13.25h3v3h-3a1.5 1.5 0 0 1 0-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
			<path d="M8 15h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
		</svg>
	);
}

function CategoryIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M6.5 6.5h1.3l1.2 8.2a2 2 0 0 0 2 1.7h5.5a2 2 0 0 0 1.9-1.4l1.1-4.1H9.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11 20h.01M17 20h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
		</svg>
	);
}

function CalendarIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function ChevronDownIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function CloseIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function CheckIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

const inputClass =
	"h-14 w-full rounded-xl border border-slate-200 bg-white px-5 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100";
