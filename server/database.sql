CREATE DATABASE cashvouchersystem;

\c cashvouchersystem

\dt

-- users table
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

-- add cash table for petty cash
CREATE table add_cash(
    add_cash_id SERIAL PRIMARY KEY,
    amount numeric,
    replenished_by VARCHAR(255),
    date_of_entry DATE,
    receipt_path text,
    cash_category VARCHAR(255) 
);

-- record expenses table for petty cash
CREATE TABLE record_expenses (
  record_expenses_id SERIAL PRIMARY KEY,
  amount NUMERIC,
  date_of_entry DATE,
  expense_category VARCHAR(255),
  reimbursed_by VARCHAR(255),
  receipt_path text
);

-- material request table
CREATE TABLE material_requests (
  id SERIAL PRIMARY KEY,
  requestor VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  designation VARCHAR(255),
  branch VARCHAR(255),
  reason VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10,2)
);

-- material request_items table
CREATE TABLE material_request_items (
  id SERIAL PRIMARY KEY,
  material_request_id INT,
  qty INT NOT NULL,
  unit VARCHAR(255) NOT NULL,
  specification VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (material_request_id) REFERENCES material_requests (id) ON DELETE CASCADE
);

-- material request_purchase_orders table
CREATE TABLE material_request_purchase_orders (
  id SERIAL PRIMARY KEY,
  material_request_id INT,
  date DATE NOT NULL,
  FOREIGN KEY (material_request_id) REFERENCES material_requests (id) ON DELETE CASCADE
);

-- material request_vouchers table
CREATE TABLE material_request_vouchers (
  id SERIAL PRIMARY KEY,
  purchase_order_id INT,
  date DATE NOT NULL,
  FOREIGN KEY (purchase_order_id) REFERENCES material_request_purchase_orders (id) ON DELETE CASCADE
);

-- cash advance request table
CREATE TABLE cash_advance_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date_borrowed DATE NOT NULL,
  designation VARCHAR(100) NOT NULL,
  amount NUMERIC NOT NULL,
  terms VARCHAR(100) NOT NULL,
  note BOOLEAN NOT NULL,
  custom_terms INTEGER
  status VARCHAR(20)
);

