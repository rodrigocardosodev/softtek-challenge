import { Transaction } from "../../../../application/models/transaction.model";
import { ITransactionRepositoryPort } from "../../../../application/ports/transaction.port";
import { PostgresSQLProvider } from "../config";

export class TransactionRepository implements ITransactionRepositoryPort{
  private static INSTANCE: TransactionRepository

  public static getInstance(client: PostgresSQLProvider): TransactionRepository {
    if (!TransactionRepository.INSTANCE) {
      TransactionRepository.INSTANCE = new TransactionRepository(client);
    }
    return TransactionRepository.INSTANCE;
  }

  constructor(private readonly client: PostgresSQLProvider) {}

  async GetAllTransactions(): Promise<Transaction[]>{
    const result = await this.client.query('SELECT * FROM transactions');
    return result.rows;
  }

  async CreateTransaction(transaction: Transaction): Promise<Transaction>{
    const result = await this.client.query('INSERT INTO transactions (operation_type, amount) VALUES ($1, $2) RETURNING *', [transaction.operationType, transaction.amount]);
    return result.rows[0];
  }

  async GetDailyBalance(): Promise<number>{
    const result = await this.client.query('SELECT SUM(amount) FROM transactions WHERE event_date >= NOW() - INTERVAL \'24 hours\'');
    return result.rows[0].sum;
  }
}