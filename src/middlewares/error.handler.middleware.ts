/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import { AppError } from "../application/errors";

export const handlingErrors = (
  err: Error & Partial<AppError>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal server error";
  console.log(err);
  return response.status(statusCode).json({ error: message });
}
