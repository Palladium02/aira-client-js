import fetch, { RequestInit } from "node-fetch";

export interface DatabaseEntry {
  [key: string]: string | number | boolean;
}

export interface DatabaseQuery {
  [key: string]:
    | string
    | number
    | boolean
    | {
        $gt?: string | number | boolean;
        $gte?: string | number | boolean;
        $lt?: string | number | boolean;
        $lte?: string | number | boolean;
      };
}

export interface DatabaseBaseResponse {
  success: boolean;
  error: {
    description: string;
    date: number;
  } | null;
}

export interface DatabaseInsertResponse extends DatabaseBaseResponse {}

export interface DatabaseUpdateResponse extends DatabaseBaseResponse {}

export interface DatabaseDeleteEntryResponse extends DatabaseBaseResponse {}

export interface DatabaseDropTableResponse extends DatabaseBaseResponse {}

export interface DatabaseFindResponse {
  result: DatabaseEntry[];
  error: {
    description: string;
    date: number;
  } | null;
}

export interface AiraClientOptions {
  email: string;
  key: string;
  host?: string;
}

class AiraClient {
  private token: string = "";
  private email: string = "";
  private host: string = "http://localhost";
  constructor(options: AiraClientOptions) {
    this.token = options.key;
    this.email = options.email;
    if (options.host) this.host = options.host;
  }

  private getFetchInit(table: string, key: string, value: any): RequestInit {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: this.token,
        databaseName: `${this.email}/${table}`,
        [key]: value,
      }),
    };
  }

  async find(
    table: string,
    query: DatabaseQuery
  ): Promise<DatabaseFindResponse> {
    return await (
      await fetch(
        `${this.host}/api/db/find`,
        this.getFetchInit(table, "query", query)
      )
    ).json();
  }

  async findOne(
    table: string,
    query: DatabaseQuery
  ): Promise<DatabaseFindResponse> {
    return await (
      await fetch(
        `${this.host}/api/db/findOne`,
        this.getFetchInit(table, "query", query)
      )
    ).json();
  }

  async insert(
    table: string,
    data: DatabaseEntry
  ): Promise<DatabaseInsertResponse> {
    return await (
      await fetch(
        `${this.host}/api/db/insert`,
        this.getFetchInit(table, "data", data)
      )
    ).json();
  }

  async update(
    table: string,
    query: DatabaseQuery,
    update: DatabaseEntry
  ): Promise<DatabaseUpdateResponse> {
    return await (
      await fetch(`${this.host}/api/db/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          update,
          sessionToken: this.token,
          databaseName: `${this.email}/${table}`,
        }),
      })
    ).json();
  }

  async deleteEntry(
    table: string,
    query: DatabaseQuery
  ): Promise<DatabaseDeleteEntryResponse> {
    return await (
      await fetch(
        `${this.host}/api/db/deleteEntry`,
        this.getFetchInit(table, "query", query)
      )
    ).json();
  }

  async dropTable(table: string): Promise<DatabaseDropTableResponse> {
    return await (
      await fetch(`${this.host}/${this.email}/db/dropTable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table,
          sessionToken: this.token,
        }),
      })
    ).json();
  }

  debug() {
    console.log(this.token);
  }
}

export { AiraClient };
