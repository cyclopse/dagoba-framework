import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("./stores.db");
const columns = [];
let sql = "SELECT ";
const pragma = db.query("pragma table_info('routes')");

for (const column of pragma ){
    sql += column[1] + ",";
    columns.push(column[1]);
}
sql = sql.substring(0, sql.length -1) + " FROM routes";


const routes = db.query(sql);

for (let i = 0; i < routes[0].length; i++){
    Deno.writeTextFileSync("./raw/" + columns[i] + ".html", atob(<string>routes[0][i]));
}

db.close();
