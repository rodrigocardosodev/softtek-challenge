import { IBalanceRepositoryPort } from "../ports/balance.port";


export class BalanceService {
    constructor(private readonly repository: IBalanceRepositoryPort) {
        this.repository = repository;
    }
    async GetBalance() {
        const balance = await this.repository.GetBalance();
        return balance;
    }
}
