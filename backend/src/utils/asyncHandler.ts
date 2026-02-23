import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function asyncHandler(fn: AsyncHandler): AsyncHandler {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
