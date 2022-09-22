import type { Color } from "../types/color.ts";

const colores: Color[] = []

export const traerColor = (): Color[] => {
  return colores
}

export const guardarColor = (
  color: string,
): Color => {
  const col: Color = {
    color
  }
  colores.push(col)
  return col
};