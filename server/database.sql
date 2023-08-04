CREATE DATABASE cashvouchersystem;

\c cashvouchersystem

\dt

-- user table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255),
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

--ADMIN USER
INSERT INTO users (username, password)
VALUES ('admin', '12345');

--SAMPLE EMPLOYEE
INSERT INTO users (fullname,username, password)
VALUES ('Agno, Joackim','employee1', '12345');

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

-- reimbursements_requests table
CREATE TABLE reimbursements_requests (
    id SERIAL PRIMARY KEY,
    area VARCHAR(255),
    period_start DATE,
    period_end DATE,
    today DATE
);

-- reimbursements_main_locations table
CREATE TABLE reimbursements_main_locations (
    id SERIAL PRIMARY KEY,
    reimbursement_request_id INT NOT NULL,
    location_name VARCHAR(255),
    date DATE,
    FOREIGN KEY (reimbursement_request_id) REFERENCES reimbursements_requests (id) ON DELETE CASCADE
);

-- reimbursements_sub_locations table
CREATE TABLE reimbursements_sub_locations (
    id SERIAL PRIMARY KEY,
    main_location_id INT NOT NULL,
    sub_location_name VARCHAR(255),
    FOREIGN KEY (main_location_id) REFERENCES reimbursements_main_locations (id) ON DELETE CASCADE
);

-- reimbursements_expenses table
CREATE TABLE reimbursements_expenses (
    id SERIAL PRIMARY KEY,
    sub_location_id INT NOT NULL,
    expense_type VARCHAR(255),
    transportation_type VARCHAR(255),
    expense_amount DECIMAL(10,2),
    FOREIGN KEY (sub_location_id) REFERENCES reimbursements_sub_locations (id) ON DELETE CASCADE
);




