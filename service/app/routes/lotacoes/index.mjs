import Router from "@koa/router"
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";

export const lotacaoRouter = new Router()

export const listLotacoes = (q) => database("lotacoes")
    .select(["lotacoes.*", "pessoas.nome as pessoa", "gabinetes.nome as gabinete"])
    .innerJoin("gabinetes", "lotacoes.gabinetes_id", "gabinetes.id")
    .innerJoin("pessoas", "lotacoes.pessoas_id", "pessoas.id")
    .whereLike("pessoas.nome", `%${q}%`)


export const findLotacao = (id) => database("lotacoes")
    .select().where({id}).first();

export const insertLotacao = (lotacao) => database("lotacoes").insert(lotacao);
export const updateLotacao = (id, lotacao) => database("lotacoes")
    .update(lotacao).where({id});

export const deleteLotacao = (id) => database("lotacoes").del().where({id});

lotacaoRouter.get("/lotacoes", authenticated, async ctx => ctx.body = await listLotacoes(ctx.query.q || ""))

lotacaoRouter.get("/lotacoes/:id", authenticated, async ctx =>
    ctx.body = await findLotacao(ctx.params.id) || ctx.throw(404, "NOT_FOUND"));

lotacaoRouter.post("/lotacoes", authenticated, async ctx =>
    ctx.body = await insertLotacao(ctx.request.body))

lotacaoRouter.put("/lotacoes/:id", authenticated, async ctx =>
    ctx.body = await updateLotacao(ctx.params.id, ctx.request.body));

lotacaoRouter.del("/lotacoes/:id", authenticated, async ctx =>
    ctx.body = await deleteLotacao(ctx.params.id));