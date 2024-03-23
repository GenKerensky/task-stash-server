import { Elysia } from "elysia";
import { msgpack } from "elysia-msgpack";
import { usersController } from "./controllers/users.controller";

const app = new Elysia()
  .use(msgpack())
  .get("/", () => "Hello Elysia")
  .use(usersController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
