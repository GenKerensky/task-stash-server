import { Elysia, t } from "elysia";

export const usersController = (app: Elysia) =>
  app.group("/user", (app) =>
    app
      .post("/signup", async ({ body }) => {}, {
        body: t.Object({
          email: t.String(),
          publicKey: t.String(),
          privateKey: t.String(),
          verifier: t.String(),
          salt: t.String(),
        }),
      })
      .post("/login", async ({ body }) => {})
  );
