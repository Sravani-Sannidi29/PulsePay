export const currentUser = {
  id: "u1",
  name: "Jordan Lee",
  email: "jordan.lee@email.com",
  phone: "+1 (555) 012-3456",
  avatar: "JL",
  balance: 24837.50,
  available: 23500.00,
  account: "****8821",
  currency: "USD",
};

export const recipients = [
  {
    id: "r1",
    name: "Alice Johnson",
    initials: "AJ",
    color: "#8B5CF6",
    bank: "Chase Bank",
    account: "****4521",
    lastAmount: 250.00,
    lastDate: "2 days ago",
    frequent: true,
  },
  {
    id: "r2",
    name: "Bob Williams",
    initials: "BW",
    color: "#3B82F6",
    bank: "Wells Fargo",
    account: "****8834",
    lastAmount: 1200.00,
    lastDate: "1 week ago",
    frequent: true,
  },
  {
    id: "r3",
    name: "Sarah Chen",
    initials: "SC",
    color: "#EC4899",
    bank: "Bank of America",
    account: "****2267",
    lastAmount: 75.00,
    lastDate: "3 weeks ago",
    frequent: false,
  },
  {
    id: "r4",
    name: "Rahul Patel",
    initials: "RP",
    color: "#10B981",
    bank: "Citibank",
    account: "****9901",
    lastAmount: 500.00,
    lastDate: "1 month ago",
    frequent: false,
  },
];

export const transactions = [
  { id: "t1", type: "sent", name: "Alice Johnson", amount: -250.00, date: "Today, 2:34 PM", status: "completed", category: "Transfer", initials: "AJ", color: "#8B5CF6" },
  { id: "t2", type: "received", name: "Payroll Inc.", amount: +5200.00, date: "Yesterday, 9:00 AM", status: "completed", category: "Salary", initials: "PI", color: "#10B981" },
  { id: "t3", type: "sent", name: "Bob Williams", amount: -1200.00, date: "Dec 28, 4:15 PM", status: "completed", category: "Transfer", initials: "BW", color: "#3B82F6" },
  { id: "t4", type: "sent", name: "Netflix", amount: -15.99, date: "Dec 27, 12:00 AM", status: "completed", category: "Subscription", initials: "NF", color: "#EF4444" },
  { id: "t5", type: "received", name: "Refund - Amazon", amount: +47.30, date: "Dec 26, 3:22 PM", status: "completed", category: "Refund", initials: "AZ", color: "#F59E0B" },
  { id: "t6", type: "sent", name: "Sarah Chen", amount: -75.00, date: "Dec 20, 11:45 AM", status: "completed", category: "Transfer", initials: "SC", color: "#EC4899" },
  { id: "t7", type: "sent", name: "Spotify", amount: -9.99, date: "Dec 18, 12:00 AM", status: "completed", category: "Subscription", initials: "SP", color: "#1DB954" },
  { id: "t8", type: "received", name: "Freelance Project", amount: +2800.00, date: "Dec 15, 5:00 PM", status: "completed", category: "Income", initials: "FP", color: "#6366F1" },
];

export const cards = [
  {
    id: "c1",
    type: "virtual",
    last4: "8821",
    holder: "Jordan Lee",
    expiry: "03/28",
    network: "Visa",
    color: "from-indigo-600 to-violet-600",
    limit: 5000,
    spent: 1247.50,
    status: "active",
  },
  {
    id: "c2",
    type: "physical",
    last4: "3342",
    holder: "Jordan Lee",
    expiry: "11/27",
    network: "Mastercard",
    color: "from-slate-700 to-slate-900",
    limit: 10000,
    spent: 3891.20,
    status: "active",
  },
];

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
];

export type Recipient = typeof recipients[0];
export type Transaction = typeof transactions[0];
export type Card = typeof cards[0];
export type Currency = typeof currencies[0];
