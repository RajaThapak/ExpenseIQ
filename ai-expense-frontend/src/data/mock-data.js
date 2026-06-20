export const CATEGORY_COLORS = {
	"Food & Dining": "#22c55e",
	Transport: "#3b82f6",
	Shopping: "#14b8a6",
	"Bills & Utilities": "#f97316",
	Entertainment: "#ec4899",
	Health: "#8b5cf6",
};

export const categories = [
	{ name: "Food & Dining", amount: 9832, percent: 40, color: CATEGORY_COLORS["Food & Dining"], icon: "food" },
	{ name: "Transport", amount: 4916, percent: 20, color: CATEGORY_COLORS.Transport, icon: "transport" },
	{ name: "Shopping", amount: 3687, percent: 15, color: CATEGORY_COLORS.Shopping, icon: "shopping" },
	{ name: "Bills & Utilities", amount: 2950, percent: 12, color: CATEGORY_COLORS["Bills & Utilities"], icon: "bills" },
	{ name: "Entertainment", amount: 1966, percent: 8, color: CATEGORY_COLORS.Entertainment, icon: "entertainment" },
	{ name: "Health", amount: 1229, percent: 5, color: CATEGORY_COLORS.Health, icon: "health" },
];

export const monthlySpending = [
	{ month: "Jan", amount: 18200 },
	{ month: "Feb", amount: 21500 },
	{ month: "Mar", amount: 19800 },
	{ month: "Apr", amount: 22100 },
	{ month: "May", amount: 24580 },
];

export const recentExpenses = [
	{ name: "Lunch at Cafe", category: "Food & Dining", amount: 450, time: "Today", icon: "food" },
	{ name: "Uber Ride", category: "Transport", amount: 280, time: "Today", icon: "transport" },
	{ name: "Amazon Shopping", category: "Shopping", amount: 1299, time: "Yesterday", icon: "shopping" },
	{ name: "Electricity Bill", category: "Bills & Utilities", amount: 1850, time: "2 days ago", icon: "bills" },
	{ name: "Netflix", category: "Entertainment", amount: 649, time: "3 days ago", icon: "entertainment" },
];

export const allExpenses = [
	{ name: "Lunch at Cafe", category: "Food & Dining", amount: 450, date: "20 Jun 2025", payment: "UPI", icon: "food" },
	{ name: "Uber Ride", category: "Transport", amount: 280, date: "20 Jun 2025", payment: "UPI", icon: "transport" },
	{ name: "Amazon Shopping", category: "Shopping", amount: 1299, date: "19 Jun 2025", payment: "Card", icon: "shopping" },
	{ name: "Electricity Bill", category: "Bills & Utilities", amount: 1850, date: "18 Jun 2025", payment: "Netbanking", icon: "bills" },
	{ name: "Netflix", category: "Entertainment", amount: 649, date: "17 Jun 2025", payment: "Card", icon: "entertainment" },
	{ name: "Grocery Store", category: "Food & Dining", amount: 2340, date: "16 Jun 2025", payment: "UPI", icon: "food" },
	{ name: "Petrol", category: "Transport", amount: 3200, date: "15 Jun 2025", payment: "Card", icon: "transport" },
	{ name: "Pharmacy", category: "Health", amount: 890, date: "14 Jun 2025", payment: "UPI", icon: "health" },
];

export const dailySpending = [
	{ day: "1", amount: 820 },
	{ day: "5", amount: 1450 },
	{ day: "10", amount: 980 },
	{ day: "15", amount: 2100 },
	{ day: "20", amount: 1250 },
	{ day: "25", amount: 1680 },
	{ day: "30", amount: 920 },
];

export const budgets = [
	{ name: "Food & Dining", spent: 9832, budget: 12000, color: CATEGORY_COLORS["Food & Dining"], icon: "food" },
	{ name: "Transport", spent: 4916, budget: 6000, color: CATEGORY_COLORS.Transport, icon: "transport" },
	{ name: "Shopping", spent: 3687, budget: 5000, color: CATEGORY_COLORS.Shopping, icon: "shopping" },
	{ name: "Bills & Utilities", spent: 2950, budget: 3500, color: CATEGORY_COLORS["Bills & Utilities"], icon: "bills" },
	{ name: "Entertainment", spent: 1966, budget: 2500, color: CATEGORY_COLORS.Entertainment, icon: "entertainment" },
	{ name: "Health", spent: 1229, budget: 2000, color: CATEGORY_COLORS.Health, icon: "health" },
];

export function formatINR(value) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);
}

export const spendingTrend = [
	{ date: "Apr 1", amount: 820 },
	{ date: "Apr 5", amount: 1450 },
	{ date: "Apr 10", amount: 980 },
	{ date: "Apr 15", amount: 2100 },
	{ date: "Apr 20", amount: 1250 },
	{ date: "Apr 25", amount: 1680 },
	{ date: "May 1", amount: 1920 },
	{ date: "May 5", amount: 2340 },
	{ date: "May 10", amount: 2180 },
	{ date: "May 15", amount: 24580 },
];

export const reportCategories = [
	{ name: "Food & Dining", amount: 9832, percent: 40, color: CATEGORY_COLORS["Food & Dining"] },
	{ name: "Transport", amount: 4916, percent: 20, color: CATEGORY_COLORS.Transport },
	{ name: "Shopping", amount: 3687, percent: 15, color: CATEGORY_COLORS.Shopping },
	{ name: "Bills & Utilities", amount: 3687, percent: 15, color: CATEGORY_COLORS["Bills & Utilities"] },
	{ name: "Entertainment", amount: 2458, percent: 10, color: CATEGORY_COLORS.Entertainment },
];

export const aiInsights = [
	{
		title: "Food spending alert",
		message: "You spent 20% more on Food this month. Try cooking at home more often to save up to ₹2,000.",
	},
	{
		title: "Reduce Swiggy orders",
		message: "Save ₹2,500 by reducing Swiggy orders. You ordered 12 times this month.",
	},
	{
		title: "Shopping improvement",
		message: "Shopping expenses dropped by 15%. Great job! Keep it up.",
	},
];

export const suggestedQuestions = [
	"Where did I spend most?",
	"How can I save more?",
	"Show last month's report",
	"Best way to budget?",
];
