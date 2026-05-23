-- Run in Supabase SQL Editor after enabling PayHero payments

ALTER TABLE transactions ALTER COLUMN application_id DROP NOT NULL;

ALTER TABLE transactions ADD COLUMN IF NOT EXISTS external_reference VARCHAR(100);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payhero_reference VARCHAR(100);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS provider_reference VARCHAR(100);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_purpose VARCHAR(50) DEFAULT 'loan_repayment';

CREATE INDEX IF NOT EXISTS idx_transactions_external_reference ON transactions(external_reference);
CREATE INDEX IF NOT EXISTS idx_transactions_payhero_reference ON transactions(payhero_reference);
