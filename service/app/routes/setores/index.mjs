import Router from "@koa/router"
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";

export const listSetores = (q) => database("setores")
    .select().whereLike("nome", `%${q}%`)

export const setorRouter = new Router()

export const findSetor = (id) => database("setores")
    .select().where({id}).first();

export const insertSetor = (setor) => database("setores").insert(setor);
export const updateSetor = (id, setor) => database("setores")
    .update(setor).where({id});

export const deleteSetor = (id) => database("setores").del().where({id});

setorRouter.get("/setores", authenticated, async ctx => ctx.body = await listSetores(ctx.query.q || ""))

setorRouter.get("/setores/:id", authenticated, async ctx =>
    ctx.body = await findSetor(ctx.params.id) || ctx.throw(404, "NOT_FOUND"));

setorRouter.post("/setores", authenticated, async ctx =>
    ctx.body = await insertSetor(ctx.request.body))

setorRouter.put("/setores/:id", authenticated, async ctx =>
    ctx.body = await updateSetor(ctx.params.id, ctx.request.body));

setorRouter.del("/setores/:id", authenticated, async ctx =>
    ctx.body = await deleteSetor(ctx.params.id));