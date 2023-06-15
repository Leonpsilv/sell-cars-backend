import { Response } from "express";
export function errorConvert(
  res: Response,
  code: number,
  msg: string,
  e?: any
) {
  return res.status(code).json({ error: e ? `${msg}: ${e}` : msg });
}
