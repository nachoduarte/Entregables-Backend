import { Context } from "../../deps.ts";
import type { Color } from "../types/color.ts";
import * as db from "../db/color.ts";

export const traerColor = async (ctx: Context) => {
  try {
    const colores: Color[] = await db.traerColor();
    ctx.response.body = colores;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const guardarColor = async (ctx: Context) => {
  try {
    const { color } = await ctx.request.body().value;
    const guardarColor: Color = await db.guardarColor(color);
    ctx.response.body = guardarColor;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};