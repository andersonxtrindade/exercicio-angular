import Router from "@koa/router";
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";
import bcrypt from "../../configs/bcrypt.js";

export const listPessoas = (q) => database("pessoas")
    .select(["pessoas.*", "perfis.nome as perfil"])
    .innerJoin("perfis", "pessoas.perfis_id", "perfis.id")
    .whereLike("pessoas.nome", `%${q}%`);

export const findPessoa = (id) => database("pessoas")
    .select().where({id}).first();

export const insertPessoa = (pessoa) => database("pessoas").insert(pessoa);
export const updatePessoa = (id, pessoa) => database("pessoas")
    .update(pessoa).where({id});

export const deletePessoa = (id) => database("pessoas").del().where({id});

export const pessoaRouter = new Router();

pessoaRouter.get("/pessoas", authenticated, async ctx =>
    ctx.body = await listPessoas(ctx.query.q || ""));

pessoaRouter.get("/pessoas/:id", authenticated, async ctx =>
    ctx.body = await findPessoa(ctx.params.id) || ctx.throw(404, "NOT_FOUND"));

pessoaRouter.post("/pessoas", authenticated, async ctx => {
    ctx.request.body.senha = await bcrypt.hash(ctx.request.body.senha);
    ctx.body = await insertPessoa(ctx.request.body)
})

pessoaRouter.put("/pessoas/:id", authenticated, async ctx => {
    ctx.body = await updatePessoa(ctx.params.id, ctx.request.body
)});

pessoaRouter.del("/pessoas/:id", authenticated, async ctx =>
    ctx.body = await deletePessoa(ctx.params.id));