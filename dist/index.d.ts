export interface DatabaseEntry {
    [key: string]: string | number | boolean;
}
export interface DatabaseQuery {
    [key: string]: string | number | boolean | {
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
export interface DatabaseInsertResponse extends DatabaseBaseResponse {
}
export interface DatabaseUpdateResponse extends DatabaseBaseResponse {
}
export interface DatabaseDeleteEntryResponse extends DatabaseBaseResponse {
}
export interface DatabaseDropTableResponse extends DatabaseBaseResponse {
}
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
declare class AiraClient {
    private token;
    private email;
    private host;
    constructor(options: AiraClientOptions);
    private getFetchInit;
    find(table: string, query: DatabaseQuery): Promise<DatabaseFindResponse>;
    findOne(table: string, query: DatabaseQuery): Promise<DatabaseFindResponse>;
    insert(table: string, data: DatabaseEntry): Promise<DatabaseInsertResponse>;
    update(table: string, query: DatabaseQuery, update: DatabaseEntry): Promise<DatabaseUpdateResponse>;
    deleteEntry(table: string, query: DatabaseQuery): Promise<DatabaseDeleteEntryResponse>;
    dropTable(table: string): Promise<DatabaseDropTableResponse>;
    debug(): void;
}
export { AiraClient };
