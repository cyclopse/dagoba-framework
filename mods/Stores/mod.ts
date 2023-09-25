import { DB } from "https://deno.land/x/sqlite/mod.ts";
export class Stores {
  db: DB;

  constructor(db_name: string) {
    this.db = new DB(db_name);
  }

  getRoutePage(route: string) {
    let page = this.db.query(`SELECT ${route} FROM routes`);
    return atob(page[0][0]);
  }

  getIndexPage() {
    const page = this.db.query("SELECT base from routes");
    return atob(page[0][0]);
  }
}
