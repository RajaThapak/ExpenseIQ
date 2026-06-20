import {
	Bar,
	BarChart,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { formatINR } from "../../data/mock-data";

export function Panel({ title, action, children, className = "" }) {
	return (
		<div
			className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-6 ${className}`}
		>
			{(title || action) && (
				<div className="mb-5 flex items-center justify-between gap-3">
					{title ? <h2 className="text-base font-bold text-slate-900">{title}</h2> : <span />}
					{action}
				</div>
			)}
			{children}
		</div>
	);
}

export function StatCard({ label, value, note, trend, trendUp }) {
	return (
		<div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
			<p className="text-sm font-medium text-slate-500">{label}</p>
			<p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">{value}</p>
			{note ? (
				<p className="mt-1.5 text-xs text-slate-400">{note}</p>
			) : null}
			{trend ? (
				<p className={`mt-2 text-xs font-semibold ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
					{trendUp ? "↑" : "↓"} {trend}
				</p>
			) : null}
		</div>
	);
}

export function CategoryIcon({ type, color, size = "md" }) {
	const sizeClass = size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-base";
	const icons = {
		food: "🍽",
		transport: "🚗",
		shopping: "🛍",
		bills: "💡",
		entertainment: "🎬",
		health: "💊",
	};

	return (
		<span
			className={`flex shrink-0 items-center justify-center rounded-xl ${sizeClass}`}
			style={{ backgroundColor: `${color}18`, color }}
			aria-hidden="true"
		>
			{icons[type] ?? "📊"}
		</span>
	);
}

export function CategoryDonutChart({ data, showCenter = false }) {
	const chartData = data.map((item) => ({
		name: item.name,
		value: item.amount,
		color: item.color,
	}));

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-center">
			<div className="relative mx-auto h-52 w-52 shrink-0">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							innerRadius={62}
							outerRadius={88}
							paddingAngle={3}
							dataKey="value"
							stroke="none"
						>
							{chartData.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip formatter={(value) => formatINR(value)} />
					</PieChart>
				</ResponsiveContainer>
				{showCenter ? (
					<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
						<p className="text-xs text-slate-400">Total</p>
						<p className="text-lg font-bold text-slate-900">
							{formatINR(chartData.reduce((sum, item) => sum + item.value, 0))}
						</p>
					</div>
				) : null}
			</div>

			<ul className="flex flex-1 flex-col gap-3">
				{data.map((item) => (
					<li key={item.name} className="flex items-center justify-between gap-3 text-sm">
						<div className="flex min-w-0 items-center gap-2.5">
							<span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="truncate text-slate-600">{item.name}</span>
						</div>
						<div className="flex shrink-0 items-center gap-3">
							<span className="font-medium text-slate-500">{item.percent}%</span>
							<span className="font-semibold text-slate-900">{formatINR(item.amount)}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export function SpendingLineChart({ data }) {
	return (
		<div className="h-56 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
					<XAxis
						dataKey="month"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#94a3b8", fontSize: 12 }}
					/>
					<YAxis hide />
					<Tooltip
						formatter={(value) => formatINR(value)}
						contentStyle={{
							borderRadius: 12,
							border: "1px solid #e2e8f0",
							boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
						}}
					/>
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#6366f1"
						strokeWidth={2.5}
						dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
						activeDot={{ r: 6, fill: "#6366f1" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export function SpendingBarChart({ data, color = "#6366f1" }) {
	return (
		<div className="h-56 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
					<XAxis
						dataKey="day"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#94a3b8", fontSize: 12 }}
					/>
					<YAxis hide />
					<Tooltip
						formatter={(value) => formatINR(value)}
						contentStyle={{
							borderRadius: 12,
							border: "1px solid #e2e8f0",
							boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
						}}
					/>
					<Bar dataKey="amount" fill={color} radius={[6, 6, 0, 0]} maxBarSize={32} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export function BudgetComparisonChart({ data }) {
	return (
		<div className="h-64 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={4}>
					<XAxis
						dataKey="name"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#94a3b8", fontSize: 11 }}
						interval={0}
						angle={-20}
						textAnchor="end"
						height={50}
					/>
					<YAxis hide />
					<Tooltip
						formatter={(value) => formatINR(value)}
						contentStyle={{
							borderRadius: 12,
							border: "1px solid #e2e8f0",
							boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
						}}
					/>
					<Bar dataKey="budget" fill="#c7d2fe" radius={[4, 4, 0, 0]} maxBarSize={20} name="Budget" />
					<Bar dataKey="spent" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={20} name="Actual" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export function ExpenseRow({ expense }) {
	return (
		<div className="flex items-center justify-between gap-4 py-3.5">
			<div className="flex min-w-0 items-center gap-3">
				<CategoryIcon type={expense.icon} color={expense.color ?? "#6366f1"} size="sm" />
				<div className="min-w-0">
					<p className="truncate font-semibold text-slate-900">{expense.name}</p>
					<p className="text-sm text-slate-500">{expense.category ?? expense.time ?? expense.date}</p>
				</div>
			</div>
			<div className="shrink-0 text-right">
				<p className="font-bold text-slate-900">{formatINR(expense.amount)}</p>
				{expense.time ? <p className="text-xs text-slate-400">{expense.time}</p> : null}
			</div>
		</div>
	);
}

export function AIInsightCard({ title, message, actionLabel = "View Details" }) {
	return (
		<div className="flex h-full flex-col rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-5 sm:p-6">
			<div className="flex items-start gap-4">
				<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
					🤖
				</span>
				<div>
					<p className="text-sm font-bold text-indigo-700">{title}</p>
					<p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
				</div>
			</div>
			<button
				type="button"
				className="mt-5 w-fit rounded-xl bg-[#6366f1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
			>
				{actionLabel}
			</button>
		</div>
	);
}

export function PrimaryButton({ children, className = "", icon = "plus" }) {
	return (
		<button
			type="button"
			className={`inline-flex items-center gap-2 rounded-xl bg-[#6366f1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f46e5] ${className}`}
		>
			{icon === "plus" ? <PlusIcon /> : icon === "export" ? <ExportIcon /> : null}
			{children}
		</button>
	);
}

export function SelectDropdown({ value, options }) {
	return (
		<select
			defaultValue={value}
			className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

export function CircularGauge({ percent, label, sublabel, size = 160 }) {
	const radius = 42;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percent / 100) * circumference;

	return (
		<div className="flex flex-col items-center">
			<div className="relative" style={{ width: size, height: size }}>
				<svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
					<circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
					<circle
						cx="50"
						cy="50"
						r={radius}
						fill="none"
						stroke="#6366f1"
						strokeWidth="8"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<p className="text-3xl font-bold text-slate-900">{percent}%</p>
					{label ? <p className="text-xs text-slate-400">{label}</p> : null}
				</div>
			</div>
			{sublabel ? <p className="mt-4 max-w-xs text-center text-sm leading-6 text-slate-600">{sublabel}</p> : null}
		</div>
	);
}

export function HealthScoreGauge({ score, max = 100 }) {
	const percent = Math.round((score / max) * 100);
	const radius = 42;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percent / 100) * circumference;

	return (
		<div className="relative h-36 w-36 shrink-0">
			<svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
				<circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="7" />
				<circle
					cx="50"
					cy="50"
					r={radius}
					fill="none"
					stroke="#6366f1"
					strokeWidth="7"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<p className="text-2xl font-bold text-slate-900">
					{score}
					<span className="text-sm font-medium text-slate-400">/{max}</span>
				</p>
			</div>
		</div>
	);
}

export function SpendingTrendChart({ data }) {
	return (
		<div className="h-64 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#94a3b8", fontSize: 11 }}
						interval="preserveStartEnd"
					/>
					<YAxis hide />
					<Tooltip
						formatter={(value) => formatINR(value)}
						contentStyle={{
							borderRadius: 12,
							border: "1px solid #e2e8f0",
							boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
						}}
					/>
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#6366f1"
						strokeWidth={2.5}
						dot={false}
						activeDot={{ r: 6, fill: "#6366f1" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export function ToggleSwitch({ label, defaultChecked = false }) {
	return (
		<label className="flex cursor-pointer items-center justify-between gap-4 py-3">
			<span className="text-sm font-medium text-slate-700">{label}</span>
			<span className="relative inline-flex h-6 w-11 shrink-0 items-center">
				<input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
				<span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-[#6366f1]" />
				<span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
			</span>
		</label>
	);
}

function ExportIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path d="M12 4v10M8.5 10.5 12 14l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M5 18h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
}
