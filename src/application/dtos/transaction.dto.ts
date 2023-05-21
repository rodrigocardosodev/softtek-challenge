export interface TransactionDTORequest {
  amount: number;
  operationType: string;
}

export interface TransactionDTOResponse {
  id: string;
  amount: number;
  operationType: string;
  eventDate: Date;
}
