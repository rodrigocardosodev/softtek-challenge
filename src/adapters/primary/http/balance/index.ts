import { Request, Response } from "express";
import { IBalanceServicePort } from "../../../../application/ports/balance.port";


export class BalanceController {
  constructor(private readonly balanceService: IBalanceServicePort) {}

  async GetBalance(request: Request, response: Response) {
    const balance = await this.balanceService.GetBalance();
    return response.status(200).json(balance);
  }
}