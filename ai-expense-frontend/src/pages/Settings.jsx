import { Panel, SelectDropdown, ToggleSwitch } from "../components/dashboard/dashboard-ui";

export default function Settings() {
	return (
		<div className="grid gap-6 xl:grid-cols-2">
			<div className="flex flex-col gap-6">
				<Panel title="Profile Settings">
					<div className="space-y-4">
						<ProfileField label="Full Name" value="Raja Kumar" />
						<ProfileField label="Email" value="rajakumar@gmail.com" />
						<ProfileField label="Phone" value="+91 98765 43210" />
					</div>
					<button
						type="button"
						className="mt-5 text-sm font-semibold text-[#6366f1] transition hover:text-[#4f46e5]"
					>
						Edit Profile
					</button>
				</Panel>

				<Panel title="Preferences">
					<div className="space-y-4">
						<PreferenceField label="Currency">
							<SelectDropdown value="INR (₹)" options={["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"]} />
						</PreferenceField>
						<PreferenceField label="Language">
							<SelectDropdown value="English" options={["English", "Hindi", "Tamil", "Telugu"]} />
						</PreferenceField>
						<PreferenceField label="Date Format">
							<SelectDropdown value="DD MMM YYYY" options={["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
						</PreferenceField>
					</div>
				</Panel>

				<Panel title="Notifications">
					<div className="divide-y divide-slate-100">
						<ToggleSwitch label="Email Notifications" defaultChecked />
						<ToggleSwitch label="Budget Alerts" defaultChecked />
						<ToggleSwitch label="Monthly Reports" />
					</div>
				</Panel>
			</div>

			<div className="flex flex-col gap-6">
				<Panel title="Security">
					<div className="divide-y divide-slate-100">
						<SecurityLink icon={<LockIcon />} label="Change Password" />
						<SecurityLink icon={<ShieldIcon />} label="Two-Factor Authentication" />
						<SecurityLink icon={<ClockIcon />} label="Login Activity" />
					</div>
				</Panel>

				<Panel title="Danger Zone">
					<button
						type="button"
						className="flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3.5 text-left transition hover:bg-red-50"
					>
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
							<TrashIcon />
						</span>
						<div>
							<p className="text-sm font-semibold text-red-600">Delete Account</p>
							<p className="text-xs text-red-400">Permanently delete your account and all data.</p>
						</div>
					</button>
				</Panel>
			</div>
		</div>
	);
}

function ProfileField({ label, value }) {
	return (
		<div>
			<label className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</label>
			<input
				type="text"
				defaultValue={value}
				readOnly
				className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none"
			/>
		</div>
	);
}

function PreferenceField({ label, children }) {
	return (
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm font-medium text-slate-700">{label}</span>
			{children}
		</div>
	);
}

function SecurityLink({ icon, label }) {
	return (
		<button
			type="button"
			className="flex w-full items-center gap-3 py-3.5 text-left transition hover:text-[#6366f1]"
		>
			<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
				{icon}
			</span>
			<span className="text-sm font-semibold text-slate-800">{label}</span>
		</button>
	);
}

function LockIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function ShieldIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path
				d="M12 3.5 19 7v5c0 4.5-3 7.5-7 8.5-4-.5-7-4-7-8.5V7l7-3.5Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ClockIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
			<path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

function TrashIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path d="M5 7h14M10 11v6M14 11v6M8 7V5h8v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M7 7l1 14h8l1-14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
		</svg>
	);
}
