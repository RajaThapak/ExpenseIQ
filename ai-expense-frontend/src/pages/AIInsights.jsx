import { useState } from "react";

import { HealthScoreGauge, Panel } from "../components/dashboard/dashboard-ui";
import { aiInsights, suggestedQuestions } from "../data/mock-data";

export default function AIInsights() {
	const [question, setQuestion] = useState("");

	return (
		<div className="flex flex-col gap-6">
			<div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/90 via-white to-white p-6 shadow-[0_10px_30px_rgba(99,102,241,0.08)] sm:p-8">
				<div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
					<div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
						<HealthScoreGauge score={84} />
						<div className="text-center sm:text-left">
							<p className="text-sm font-semibold text-indigo-600">Good Evening, Raja!</p>
							<h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
								Here&apos;s your financial health score
							</h2>
							<p className="mt-2 text-sm text-slate-500">
								Great job! You&apos;re managing your finances well.
							</p>
						</div>
					</div>
					<div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-indigo-100/80 text-6xl">
						🤖
					</div>
				</div>
			</div>

			<div>
				<h2 className="mb-4 text-base font-bold text-slate-900">Top Insights For You</h2>
				<div className="grid gap-4 lg:grid-cols-3">
					{aiInsights.map((insight) => (
						<InsightCard key={insight.title} title={insight.title} message={insight.message} />
					))}
				</div>
			</div>

			<Panel title="Ask ExpenseIQ">
				<div className="flex flex-col gap-4">
					<div className="flex gap-3">
						<input
							type="text"
							value={question}
							onChange={(event) => setQuestion(event.target.value)}
							placeholder="Type your question..."
							className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
						/>
						<button
							type="button"
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6366f1] text-white transition hover:bg-[#4f46e5]"
							aria-label="Send question"
						>
							<SendIcon />
						</button>
					</div>

					<div className="flex flex-wrap gap-2">
						{suggestedQuestions.map((item) => (
							<button
								key={item}
								type="button"
								onClick={() => setQuestion(item)}
								className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
							>
								{item}
							</button>
						))}
					</div>
				</div>
			</Panel>
		</div>
	);
}

function InsightCard({ title, message }) {
	return (
		<div className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
			<p className="text-sm font-bold text-slate-900">{title}</p>
			<p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{message}</p>
			<button
				type="button"
				className="mt-4 text-left text-sm font-semibold text-[#6366f1] transition hover:text-[#4f46e5]"
			>
				View Details
			</button>
		</div>
	);
}

function SendIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path
				d="m5 12 14-7-4 7 4 7-14-7Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
