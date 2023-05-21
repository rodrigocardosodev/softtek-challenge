import { Request, Response } from "express";
import { ITransactionServicePort } from "../../../../application/ports/transaction.port";
import { transactionSchemaRequest } from "../../../../validators";
import { TransactionDTORequest } from "../../../../application/dtos/transaction.dto";
import { BadRequestValidationError } from "../../../../application/errors";

export class TransactionController {
  constructor(private readonly transactionService: ITransactionServicePort) {}

  async GetAllTransactions(request: Request, response: Response) {
    const transactions = await this.transactionService.GetAllTransactions();
    return response.status(200).json(transactions);
  }

  async CreateTransaction(request: Request, response: Response) {
    const { operationType, amount } = request.body;

    if (!transactionSchemaRequest.safeParse(request.body).success) {
      throw new BadRequestValidationError();
    }

    const transactionDTO: TransactionDTORequest = {
      operationType,
      amount,
    };


    const transaction = await this.transactionService.CreateTransaction(transactionDTO);

    return response.status(201).json(transaction);
  }
}