// Database schema types for NYOTA Fund application

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplication {
  id: number;
  userId: number;
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: string;
  county: string;
  subCounty?: string;
  ward?: string;
  loanType: string;
  loanAmount: number;
  loanPurpose: string;
  monthlyIncome: number;
  employmentStatus: string;
  businessName?: string;
  businessType?: string;
  businessDuration?: string;
  mpesaNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  applicationId?: string;
  mpesaNumber: string;
  amount: number;
  transactionId?: string;
  externalReference?: string;
  payheroReference?: string;
  providerReference?: string;
  paymentPurpose?: 'loan_repayment' | 'processing_fee';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Database {
  users: User[];
  applications: LoanApplication[];
  transactions: Transaction[];
}
