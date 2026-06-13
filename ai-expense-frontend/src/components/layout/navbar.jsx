import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
	"/dashboard": "Dashboard",
	"/dashboard/expenses": "Expenses",
	"/dashboard/categories": "Categories",
	"/dashboard/budgets": "Budgets",
	"/dashboard/reports": "Reports",
	"/dashboard/ai-insights": "AI Insights",
	"/dashboard/settings": "Settings",
};

export default function Navbar() {
	const { pathname } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	const pageTitle = useMemo(() => {
		return PAGE_TITLES[pathname] ?? "Dashboard";
	}, [pathname]);

	return (
		<header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
			<div className="flex h-18 items-center justify-between gap-6 px-6 sm:px-8 lg:px-10">
				<div className="flex min-w-0 items-center gap-4">
					<h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
						{pageTitle}
					</h1>
				</div>

				<div className="flex shrink-0 items-center gap-4">
					<button
						type="button"
						className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50"
						aria-label="Notifications"
					>
						<BellIcon />
						<span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
					</button>

					<div className="relative">
						<button
							type="button"
							onClick={() => setMenuOpen((open) => !open)}
							className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-4 transition hover:bg-slate-50"
							aria-expanded={menuOpen}
							aria-haspopup="menu"
						>
							<span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#5b4bff_0%,#6d28d9_100%)] text-xs font-bold text-white">
								RK
							</span>
							<span className="hidden text-sm font-medium text-slate-900 sm:inline">
								Raja Kumar
							</span>
							<ChevronDownIcon />
						</button>

						{menuOpen ? (
							<div
								className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
								role="menu"
							>
								<button
									type="button"
									className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
									role="menuitem"
									onClick={() => setMenuOpen(false)}
								>
									Profile
								</button>
								<button
									type="button"
									className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
									role="menuitem"
									onClick={() => setMenuOpen(false)}
								>
									Settings
								</button>
								<button
									type="button"
									className="block w-full px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
									role="menuitem"
									onClick={() => {
										localStorage.removeItem("expenseiq-auth");
										window.location.href = "/login";
									}}
								>
									Log out
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</header>
	);
}

function BellIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<path
				d="M12 4.75a4.25 4.25 0 0 0-4.25 4.25v2.1c0 .47-.16.93-.45 1.3l-.82 1.09A1.25 1.25 0 0 0 7.75 15h8.5a1.25 1.25 0 0 0 1.02-1.51l-.82-1.09a2.1 2.1 0 0 1-.45-1.3v-2.1A4.25 4.25 0 0 0 12 4.75Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path
				d="M10.25 17.25a1.75 1.75 0 0 0 3.5 0"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function ChevronDownIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-500" aria-hidden="true">
			<path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
