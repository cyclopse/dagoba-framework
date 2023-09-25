import { DB } from "https://deno.land/x/sqlite/mod.ts";

let columns = [];
let table_sql = "CREATE TABLE routes(";
let insert_sql = "INSERT INTO routes(";
for( const file of Deno.readDirSync("./raw")){
    columns.push(loadField(file));
    table_sql += file.name.split(".")[0] + " TEXT,";
    insert_sql += file.name.split(".")[0] + ","
}

table_sql = table_sql.substring(0, table_sql.length -1) + ")";
insert_sql = insert_sql.substring(0, insert_sql.length -1) + ") VALUES(";
const db = new DB("./stores.db");

db.execute("DROP TABLE routes");
db.execute(table_sql);


for( const file of columns ){
    const contents = Deno.readTextFileSync("./raw/" + file + ".html");
    insert_sql += "'" + btoa(contents) + "',";
}

insert_sql = insert_sql.substring(0, insert_sql.length -1) + ")";
db.execute(insert_sql);
db.close();


//Functions

function loadField(f: any){
    const t = JSON.stringify(f);
    const file = JSON.parse(t);
    let column;
    if( file["isFile"] == true){
        column = file["name"].split(".")[0];
    }
return column;
}


