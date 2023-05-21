/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from "pg";

export class PostgresSQLProvider {
  private static INSTANCE: PostgresSQLProvider

  public static getInstance(client: Pool): PostgresSQLProvider {
    if (!PostgresSQLProvider.INSTANCE) {
      PostgresSQLProvider.INSTANCE = new PostgresSQLProvider(client);
    }
    return PostgresSQLProvider.INSTANCE;
  }

  constructor(private readonly client: Pool) {}

  async query(query: string, values?: any[]): Promise<any> {
    const client = await this.client.connect();
    try {
      return await client.query(query, values).then((result) => result || []);
    } catch (e) {
      console.log(e);
    } finally {
      client.release();
    }
  }
}
