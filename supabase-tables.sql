-- NYOTA Fund Database Tables for Supabase
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Create users table (using UUID for id - Supabase default)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  id_number VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create loan_applications table (using UUID for id - Supabase default)
DROP TABLE IF EXISTS loan_applications;
CREATE TABLE IF NOT EXISTS loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT NULL,
  full_name VARCHAR(255) NOT NULL,
  id_number VARCHAR(50) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  county VARCHAR(100) NOT NULL,
  sub_county VARCHAR(100) NOT NULL,
  ward VARCHAR(100) NOT NULL,
  loan_type VARCHAR(100) NOT NULL,
  loan_amount DECIMAL(15, 2) NOT NULL,
  loan_purpose TEXT NOT NULL,
  monthly_income DECIMAL(15, 2) NOT NULL,
  employment_status VARCHAR(50) NOT NULL,
  business_name VARCHAR(255),
  business_type VARCHAR(100),
  business_duration VARCHAR(50),
  mpesa_number VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table (using UUID for id - Supabase default)
DROP TABLE IF EXISTS transactions;
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID,
  mpesa_number VARCHAR(50) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  transaction_id VARCHAR(100),
  external_reference VARCHAR(100),
  payhero_reference VARCHAR(100),
  provider_reference VARCHAR(100),
  payment_purpose VARCHAR(50) DEFAULT 'loan_repayment',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Run if upgrading an existing database:
-- ALTER TABLE transactions ALTER COLUMN application_id DROP NOT NULL;
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS external_reference VARCHAR(100);
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payhero_reference VARCHAR(100);
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS provider_reference VARCHAR(100);
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_purpose VARCHAR(50) DEFAULT 'loan_repayment';

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- For simplicity, we'll keep the database open for anonymous inserts
-- In production, you should configure proper authentication

-- Create policies for loan_applications table (open for anonymous submissions)
CREATE POLICY "Anyone can insert loan applications" ON loan_applications
  FOR INSERT WITH CHECK (true);

-- Allow anyone to view loan applications (for demo purposes)
CREATE POLICY "Anyone can view loan applications" ON loan_applications
  FOR SELECT USING (true);

-- Create policies for transactions table
CREATE POLICY "Anyone can insert transactions" ON transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view transactions" ON transactions
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_email ON loan_applications(email);
CREATE INDEX IF NOT EXISTS idx_loan_applications_id_number ON loan_applications(id_number);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
