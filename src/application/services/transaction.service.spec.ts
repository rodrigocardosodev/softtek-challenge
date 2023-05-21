import { TransactionRepositoryMock } from "../mocks/repository/transaction.repository.mock";
import { TransactionService } from "./transaction.service";


describe('BalanceService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepositoryMock;

    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock();
      transactionService = new TransactionService(transactionRepository);
    });

    describe('GetBalance', () => {
        it('should return balance', async () => {
            const balance = await transactionService.CreateTransaction({
                amount: 100,
                operationType: 'credit',
            });
            expect(balance).toEqual({
                amount: 100,
                operationType: 'credit',
            });
        });
        it('should be a error operation type', async () => {
            try {
                await transactionService.CreateTransaction({
                    amount: 100,
                    operationType: 'invalid',
                });
            } catch (error) {
                expect(error.message).toEqual('Invalid operation type');
            }
        });
        it('should be a error amount', async () => {
            try {
                await transactionService.CreateTransaction({
                    amount: -100,
                    operationType: 'credit',
                });
            } catch (error) {
                expect(error.message).toEqual('Invalid amount');
            }
        });
    });
});