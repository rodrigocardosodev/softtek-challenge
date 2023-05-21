import { BalanceRepositoryMock } from "../mocks/repository/balance.repository.mock";
import { BalanceService } from "./balance.service";


describe('BalanceService', () => {
    let balanceService: BalanceService;
    let balanceRepository: BalanceRepositoryMock;

    beforeEach(() => {
        balanceRepository = new BalanceRepositoryMock();
        balanceService = new BalanceService(balanceRepository);
    });

    describe('GetBalance', () => {
        it('should return balance', async () => {
            const balance = await balanceService.GetBalance();
            expect(balance).toEqual({
                dailyBalance: 0,
                weeklyBalance: 0,
                monthlyBalance: 0,
                totalBalance: 0
            });
        });
    });
});