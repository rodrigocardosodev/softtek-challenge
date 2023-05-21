import { ITransactionRepositoryPort } from "application/ports/transaction.port";
import { Transaction } from "../../models/transaction.model";

export class TransactionRepositoryMock implements ITransactionRepositoryPort{
    transactions: Transaction[] = [];

    async CreateTransaction(transaction: Transaction): Promise<Transaction> {
        this.transactions.push(transaction);
        return transaction;
    }

    async GetAllTransactions(): Promise<Transaction[]> {
        return this.transactions;
    }
}