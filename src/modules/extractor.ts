import { Request } from "express";

export const extractFromParam = (req: Request) => ({
    take: req.query.take ? Number(req.query.take) : 10,
    skip: req.query.skip ? Number(req.query.skip) : 0,
    cursor: req.query.cursor ? {
        id: Number(req.query.cursor)
    } : undefined,

    orderBy: req.query.orderBy ? req.query.orderBy as any : undefined,
})