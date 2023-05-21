CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(19,2) NOT NULL,
    operation_type VARCHAR(20) NOT NULL,
    event_date timestamp default current_timestamp
);