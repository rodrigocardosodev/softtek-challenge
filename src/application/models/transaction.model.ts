export interface Transaction {
  id?: string;
  amount: number;
  operationType: string;
  eventDate?: Date;
}