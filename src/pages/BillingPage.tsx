import { ReceiptText } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

const MOCK_TRANSACTIONS: Transaction[] = [];

const STATUS_STYLES: Record<Transaction["status"], string> = {
  paid: "bg-green-500/10 text-green-600 dark:text-green-400",
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  failed: "bg-destructive/10 text-destructive",
};

export function BillingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Billing
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your purchases and subscription.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {MOCK_TRANSACTIONS.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <ReceiptText className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                No transactions found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your purchase history will appear here once you make a purchase.
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20"
                >
                  <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-foreground">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
