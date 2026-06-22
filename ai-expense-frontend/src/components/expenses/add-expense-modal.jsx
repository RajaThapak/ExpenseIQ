import { useEffect, useState } from "react";

const CATEGORIES = [
	"Food & Dining",
	"Transport",
	"Shopping",
	"Bills & Utilities",
	"Entertainment",
	"Health",
];

const PAYMENT_METHODS = ["UPI", "Card", "Cash", "Netbanking"];

const INITIAL_FORM = {
	name: "",
	category: "Food & Dining",
	amount: "",
	date: new Date().toISOString().slice(0, 10),
	payment: "UPI",
	note: "",
};

export default function AddExpenseModal({ open, onClose, onSave }) {
	if (!open) return null;

	return <AddExpenseModalContent onClose={onClose} onSave={onSave} />;
}

function AddExpenseModalContent({ onClose, onSave }) {
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

		onSave({
			...form,
			amount: Number(form.amount),
			date: formatDate(form.date),
		});
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button
				type="button"
				className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
				onClick={onClose}
				aria-label="Close add expense modal"
			/>

			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="add-expense-title"
				className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]"
			>
				<div className="border-b border-slate-100 px-6 py-5">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">New Expense</p>
							<h2 id="add-expense-title" className="mt-1 text-xl font-bold text-slate-950">
								Add Expense
							</h2>
							<p className="mt-1 text-sm text-slate-500">
								Record a transaction with amount, category, date, and payment method.
							</p>
						</div>
						<button
							type="button"
							onClick={onClose}
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
							aria-label="Close"
						>
							<CloseIcon />
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Expense Name" required>
							<input
								type="text"
								required
								value={form.name}
								onChange={(event) => updateField("name", event.target.value)}
								placeholder="e.g., Lunch at cafe"
								className={inputClass}
							/>
						</Field>

						<Field label="Amount" required>
							<div className="relative">
								<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
									Rs.
								</span>
								<input
									type="number"
									required
									min="1"
									step="1"
									value={form.amount}
									onChange={(event) => updateField("amount", event.target.value)}
									placeholder="0"
									className={`${inputClass} pl-11`}
								/>
							</div>
						</Field>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Category" required>
							<select
								required
								value={form.category}
								onChange={(event) => updateField("category", event.target.value)}
								className={inputClass}
							>
								{CATEGORIES.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</Field>

						<Field label="Payment Method" required>
							<select
								required
								value={form.payment}
								onChange={(event) => updateField("payment", event.target.value)}
								className={inputClass}
							>
								{PAYMENT_METHODS.map((method) => (
									<option key={method} value={method}>
										{method}
									</option>
								))}
							</select>
						</Field>
					</div>

					<Field label="Date" required>
						<input
							type="date"
							required
							value={form.date}
							onChange={(event) => updateField("date", event.target.value)}
							className={inputClass}
						/>
					</Field>

					<Field label="Note">
						<textarea
							value={form.note}
							onChange={(event) => updateField("note", event.target.value)}
							placeholder="Optional details"
							rows={3}
							className={`${inputClass} resize-none`}
						/>
					</Field>

					<div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
						<button
							type="button"
							onClick={onClose}
							className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-xl bg-[#6366f1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
						>
							Save Expense
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Field({ label, required, children }) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-sm font-semibold text-slate-800">
				{label}
				{required ? <span className="text-red-500"> *</span> : null}
			</span>
			{children}
		</label>
	);
}

function formatDate(value) {
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function CloseIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

const inputClass =
	"w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100";
