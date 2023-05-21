import { Balance } from "../../../../application/models/balance.model";
import { IBalanceRepositoryPort } from "../../../../application/ports/balance.port";
import { PostgresSQLProvider } from "../config";

export class BalanceRepository implements IBalanceRepositoryPort{
  private static INSTANCE: BalanceRepository

  public static getInstance(client: PostgresSQLProvider): BalanceRepository {
    if (!BalanceRepository.INSTANCE) {
      BalanceRepository.INSTANCE = new BalanceRepository(client);
    }
    return BalanceRepository.INSTANCE;
  }

  constructor(private readonly client: PostgresSQLProvider) {}

  async GetBalance(): Promise<Balance>{
    const query = `
    SELECT 
      (SELECT SUM(amount) FROM transactions WHERE DATE_TRUNC('day', event_date) = DATE_TRUNC('day', CURRENT_TIMESTAMP)) as daily_total,
      (SELECT SUM(amount) FROM transactions WHERE DATE_TRUNC('week', event_date) = DATE_TRUNC('week', CURRENT_TIMESTAMP)) as weekly_total,
      (SELECT SUM(amount) FROM transactions WHERE DATE_TRUNC('month', event_date) = DATE_TRUNC('month', CURRENT_TIMESTAMP)) as monthly_total,
      (SELECT SUM(amount) FROM transactions) as total_balance;
    `;

    const result = await this.client.query(query);

    const balance: Balance = {
      dailyBalance: result.rows[0].daily_total,
      weeklyBalance: result.rows[0].weekly_total,
      monthlyBalance: result.rows[0].monthly_total,
      totalBalance: result.rows[0].total_balance,
    };

    return balance;
  }
}
