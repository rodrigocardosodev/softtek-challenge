import zod from 'zod';

export const transactionSchemaRequest = zod.object({
  amount: zod.number().positive(),
  operationType: zod.enum(['credit', 'debit']),
});
