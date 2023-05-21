import "express-async-errors";

import express, { Router } from "express";

import { handlingErrors } from "../../middlewares/error.handler.middleware";


import { Pool } from "pg";
import { PostgresSQLProvider } from "../../adapters/secondary/postgres/config";
import { TransactionRepository } from "../../adapters/secondary/postgres/transaction";
import { BalanceRepository } from "../../adapters/secondary/postgres/balance";
import { BalanceService } from "../../application/services/balance.service";
import { TransactionService } from "../../application/services/transaction.service";
import { TransactionController } from "../../adapters/primary/http/transaction";
import { BalanceController } from "../../adapters/primary/http/balance";

const database = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DATABASE || "postgres",
  password: process.env.POSTGRES_PASS || "postgres",
  port: Number(process.env.POSTGRES_PORT) || 5432,
})


const postgresProvider = new PostgresSQLProvider(database);
const transactionRepository = new TransactionRepository(postgresProvider);
const balanceRepository = new BalanceRepository(postgresProvider);

const transactionService = new TransactionService(transactionRepository);
const balanceService = new BalanceService(balanceRepository);

const transactionController = new TransactionController(transactionService);
const balanceController = new BalanceController(balanceService);

const router = Router();

router.get("/transactions", async (request, response) => {
  await transactionController.GetAllTransactions(request, response);
});

router.post("/transactions", async (request, response) => {
  await transactionController.CreateTransaction(request, response);
});

router.get("/balance", async (request, response) => {
  await balanceController.GetBalance(request, response);
});


const app = express();

app.use(express.json());

app.use(router);

app.use(handlingErrors);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});