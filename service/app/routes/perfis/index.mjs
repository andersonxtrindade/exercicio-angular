import Router from "@koa/router"
import authenticated from '../../middleware/authenticated.js';

import {database} from "../../configs/database.mjs";

export const listPerfil = () => database("perfis").select()

export const perfilRouter = new Router()

perfilRouter.get("/perfis", authenticated, async ctx => ctx.body = await listPerfil())