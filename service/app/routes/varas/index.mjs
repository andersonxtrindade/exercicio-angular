import Router from "@koa/router"
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";

export const listVaras = (q) => database("varas")
    .select(["varas.*", "setores.nome as setor"])
    .innerJoin("setores", "varas.setores_id", "setores.id")
    .whereLike("varas.nome", `%${q}%`)

export const varaRouter = new Router()

export const findVara = (id) => database("varas")
    .select().where({id}).first();

export const insertVara = (vara) => database("varas").insert(vara);
export const updateVara = (id, vara) => database("varas")
    .update(vara).where({id});

export const deleteVara = (id) => database("varas").del().where({id});

varaRouter.get("/varas", authenticated, async ctx => ctx.body = await listVaras(ctx.query.q || ""))

varaRouter.get("/varas/:id", authenticated, async ctx =>
    ctx.body = await findVara(ctx.params.id) || ctx.throw(404, "NOT_FOUND"));

varaRouter.post("/varas", authenticated, async ctx =>
    ctx.body = await insertVara(ctx.request.body))

varaRouter.put("/varas/:id", authenticated, async ctx =>
    ctx.body = await updateVara(ctx.params.id, ctx.request.body));

varaRouter.del("/varas/:id", authenticated, async ctx =>
    ctx.body = await deleteVara(ctx.params.id));