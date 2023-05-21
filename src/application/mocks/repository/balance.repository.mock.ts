import { IBalanceRepositoryPort } from "../../ports/balance.port";

export class BalanceRepositoryMock implements IBalanceRepositoryPort{
  async GetBalance() {
    return {
      dailyBalance: 0,
      weeklyBalance: 0,
      monthlyBalance: 0,
      totalBalance: 0
    };
  }
}