import Router from "@koa/router";
import jwt from "jsonwebtoken";
import {database} from "../../configs/database.mjs";
import bcrypt from "../../configs/bcrypt.js";

export const authRouter = new Router();
const secret = process.env.JWT_SECRET || 'secret';

export const listUser = (q) =>
  database("pessoas")
    .select(["id", "senha"])
    .where("nome", q);

authRouter.post("/login", async (ctx) => {
  const dbUser = await listUser(ctx.request.body.nome);

  if (dbUser.length === 0) {
    ctx.body = {status: "error", message: "Não há usuário."};
    return;
  }

  if (await bcrypt.compare(ctx.request.body.senha, dbUser[0].senha)) {
    const payload = { sub: dbUser.id };
    const token = jwt.sign(payload, secret);
    const newPayload = {token: token}
    ctx.body = newPayload;
  } else {
    ctx.body = {status: "error", message: "Senha incorreta."};
  }
});
