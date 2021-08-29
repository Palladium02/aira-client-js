var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
class AiraClient {
    constructor(options) {
        this.token = "";
        this.email = "";
        this.host = "http://localhost";
        this.token = options.key;
        this.email = options.email;
        if (options.host)
            this.host = options.host;
    }
    getFetchInit(table, key, value) {
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
    find(table, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/api/db/find`, this.getFetchInit(table, "query", query))).json();
        });
    }
    findOne(table, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/api/db/findOne`, this.getFetchInit(table, "query", query))).json();
        });
    }
    insert(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/api/db/insert`, this.getFetchInit(table, "data", data))).json();
        });
    }
    update(table, query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/api/db/update`, {
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
            })).json();
        });
    }
    deleteEntry(table, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/api/db/deleteEntry`, this.getFetchInit(table, "query", query))).json();
        });
    }
    dropTable(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield fetch(`${this.host}/${this.email}/db/dropTable`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    table,
                    sessionToken: this.token,
                }),
            })).json();
        });
    }
    debug() {
        console.log(this.token);
    }
}
export { AiraClient };
