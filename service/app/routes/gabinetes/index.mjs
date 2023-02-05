import Router from "@koa/router";
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";

export const gabineteRouter = new Router()

export const listGabinetes = (q) => database("gabinetes")
    .select(["gabinetes.*", "varas.nome as vara"])
    .innerJoin("varas", "gabinetes.varas_id", "varas.id")
    .whereLike("gabinetes.nome", `%${q}%`)

export const findGabinete = (id) => database("gabinetes")
    .select().where({id}).first();

export const insertGabinete = (gabinete) => database("gabinetes").insert(gabinete);
export const updateGabinete = (id, gabinete) => database("gabinetes")
    .update(gabinete).where({id});

export const deleteGabinete = (id) => database("gabinetes").del().where({id});

gabineteRouter.get("/gabinetes", authenticated, async ctx => ctx.body = await listGabinetes(ctx.query.q || ""))

gabineteRouter.get("/gabinetes/:id", authenticated, async ctx =>
    ctx.body = await findGabinete(ctx.params.id) || ctx.throw(404, "NOT_FOUND"));

gabineteRouter.post("/gabinetes", authenticated, async ctx =>
    ctx.body = await insertGabinete(ctx.request.body));

gabineteRouter.put("/gabinetes/:id", authenticated, async ctx =>
    ctx.body = await updateGabinete(ctx.params.id, ctx.request.body));

gabineteRouter.del("/gabinetes/:id", authenticated, async ctx =>
    ctx.body = await deleteGabinete(ctx.params.id));