import { NavLink } from "react-router-dom";

const navItems = [
	{ label: "Dashboard", to: "/dashboard", icon: DashboardIcon },
	{ label: "Expenses", to: "/dashboard/expenses", icon: ReceiptIcon },
	{ label: "Categories", to: "/dashboard/categories", icon: GridIcon },
	{ label: "Budgets", to: "/dashboard/budgets", icon: WalletIcon },
	{ label: "Reports", to: "/dashboard/reports", icon: ReportIcon },
	{ label: "AI Insights", to: "/dashboard/ai-insights", icon: SparkIcon },
	{ label: "Settings", to: "/dashboard/settings", icon: SettingsIcon },
];

export default function Sidebar() {
	return (
		<aside className="flex h-full w-full flex-col bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] px-5 py-6 shadow-[0_24px_60px_rgba(91,75,255,0.08)] lg:w-72 lg:border-r lg:border-slate-200/70">
			<div className="mb-8 flex items-center gap-3 px-1">
				<img
					src="/favicon.png"
					alt="ExpenseIQ logo"
					className="h-11 w-11 shrink-0 rounded-2xl object-cover shadow-[0_16px_30px_rgba(91,75,255,0.25)]"
				/>
				<div>
					<p className="text-xl font-black tracking-[-0.05em] text-slate-950">
						ExpenseIQ
					</p>
					<p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
						Smart expense tracking
					</p>
				</div>
			</div>

			<nav className="flex flex-1 flex-col gap-1">
				{navItems.map((item) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.label}
							to={item.to}
							end={item.to === "/dashboard"}
							className={({ isActive }) => [
								"group flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.98rem] font-medium transition",
								isActive
									? "bg-[linear-gradient(135deg,rgba(91,75,255,0.12),rgba(109,40,217,0.10))] text-[#4f46e5] shadow-[0_12px_30px_rgba(91,75,255,0.08)]"
									: "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
							].join(" ")}
						>
							<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition group-hover:text-[#4f46e5]">
								<Icon />
							</span>
							<span>{item.label}</span>
						</NavLink>
					);
				})}
			</nav>

			<div className="mt-6 rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(91,75,255,0.12),rgba(255,255,255,0.9))] p-4 text-slate-700 shadow-[0_16px_40px_rgba(91,75,255,0.08)]">
				<p className="text-sm font-semibold text-slate-900">Weekly summary</p>
				<p className="mt-1 text-sm leading-6 text-slate-600">
					Keep an eye on your spending trends and review AI suggestions from the sidebar.
				</p>
			</div>
		</aside>
	);
}

function DashboardIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M4 12.5V19h6v-6.5H4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M4 5h6v5H4V5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M14 5h6v8h-6V5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M14 16h6v3h-6v-3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
		</svg>
	);
}

function ReceiptIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M7 4.5h10A1.5 1.5 0 0 1 18.5 6v14l-2.25-1.5L14 20l-2.25-1.5L9.5 20 7 18.5V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
		</svg>
	);
}

function GridIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M5 5h5v5H5V5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M14 5h5v5h-5V5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M5 14h5v5H5v-5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M14 14h5v5h-5v-5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
		</svg>
	);
}

function WalletIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M4.5 7.5h13A2.5 2.5 0 0 1 20 10v7.5A2.5 2.5 0 0 1 17.5 20H6A1.5 1.5 0 0 1 4.5 18.5v-11Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M17 12h2.5a1.5 1.5 0 0 1 0 3H17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 7.5 7.7 5.2A2 2 0 0 1 9.3 4.5H18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ReportIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M6 4.5h9l3 3v12H6v-15Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
			<path d="M9 13h6M9 16h6M9 10h3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
		</svg>
	);
}

function SparkIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7 10.4 12.2 5 10.6 10.4 9 12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
			<path d="M18.5 14.5 19 16l1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" fill="currentColor" />
		</svg>
	);
}

function SettingsIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path d="M10.2 4.9 9.5 7.2a7.2 7.2 0 0 0-1.8 1l-2.2-.6-1.5 2.8 1.7 1.6a7.4 7.4 0 0 0 0 2l-1.7 1.6 1.5 2.8 2.2-.6c.6.4 1.2.8 1.8 1l.7 2.3h3.2l.7-2.3c.6-.2 1.2-.6 1.8-1l2.2.6 1.5-2.8-1.7-1.6a7.4 7.4 0 0 0 0-2l1.7-1.6-1.5-2.8-2.2.6c-.6-.4-1.2-.8-1.8-1l-.7-2.3h-3.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
			<path d="M12 15.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	);
}
