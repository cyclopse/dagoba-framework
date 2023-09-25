import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Stores } from "./mods/Stores/mod.ts";

const router = new Router();
const db = new DB("stores.db");
const st = new Stores("stores.db");

Deno.addSignalListener("SIGINT", () => {
  console.log("closing database...\n");
  db.close();
  console.log("shutting down...\n");
  Deno.exit();
});

router
  .get("/", async (context) => {
    context.response.body = await st.getIndexPage();
  })
  .get("/:route", async (context) => {
    const route = context.params.route;
    context.response.body = await st.getRoutePage(route);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
