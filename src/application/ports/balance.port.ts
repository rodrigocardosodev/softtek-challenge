import { Balance } from "../models/balance.model";

export interface IBalanceServicePort {
  GetBalance(): Promise<Balance>;
}

export interface IBalanceRepositoryPort {
  GetBalance(): Promise<Balance>;
}
