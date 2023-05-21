import { InvalidOperationError } from "../errors";
import { Transaction } from "../models/transaction.model";
import { ITransactionRepositoryPort } from "../ports/transaction.port";

export class TransactionService {
    constructor(private readonly repository: ITransactionRepositoryPort) {
        this.repository = repository;
    }
    async GetAllTransactions() {
        return await this.repository.GetAllTransactions();
    }
    async CreateTransaction(transaction: Transaction) {
        if (transaction.operationType === 'debit') {
            transaction.amount = -Math.abs(transaction.amount);
        }
        else if (transaction.operationType === 'credit') {
            transaction.amount = Math.abs(transaction.amount);
        }
        else {
            throw new InvalidOperationError();
        }
        return await this.repository.CreateTransaction(transaction);
    }
}
