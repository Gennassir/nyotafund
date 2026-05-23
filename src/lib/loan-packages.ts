export type LoanPackage = {
  amount: number;
  fee: number;
  label: string;
};

export const LOAN_PACKAGES: LoanPackage[] = [
  { amount: 22000, fee: 180, label: 'KSh 22,000' },
  { amount: 32300, fee: 210, label: 'KSh 32,300' },
  { amount: 43800, fee: 240, label: 'KSh 43,800' },
  { amount: 50000, fee: 290, label: 'KSh 50,000' },
  { amount: 93300, fee: 350, label: 'KSh 93,300' },
  { amount: 102000, fee: 390, label: 'KSh 102,000' },
  { amount: 150000, fee: 450, label: 'KSh 150,000' },
  { amount: 200000, fee: 520, label: 'KSh 200,000' },
  { amount: 220000, fee: 580, label: 'KSh 220,000' },
];

export function getProcessingFee(loanAmount: number | string): number | null {
  const amount = typeof loanAmount === 'string' ? Number(loanAmount) : loanAmount;
  const pkg = LOAN_PACKAGES.find((p) => p.amount === amount);
  return pkg?.fee ?? null;
}

export function formatPackageOption(pkg: LoanPackage): string {
  return `${pkg.label} — processing fee KSh ${pkg.fee.toLocaleString()}`;
}
