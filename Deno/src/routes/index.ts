import { Router } from "../../deps.ts";
import {
  guardarColor,
  traerColor
} from "../controllers/color.ts";

export const router = new Router()
  //Producto routes
  .get("/color", traerColor)
  .post("/color", guardarColor);