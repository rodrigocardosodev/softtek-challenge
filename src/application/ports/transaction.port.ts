import { Transaction } from "../models/transaction.model";

export interface ITransactionRepositoryPort {
  GetAllTransactions(): Promise<Transaction[]>;
  CreateTransaction(transaction: Transaction): Promise<Transaction>;
}

export interface ITransactionServicePort {
  GetAllTransactions(): Promise<Transaction[]>;
  CreateTransaction(transaction: Transaction): Promise<Transaction>;
}
