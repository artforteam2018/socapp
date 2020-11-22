import { Request, RequestHandler, Response } from 'express';

export const headers: RequestHandler = (request: Request, response: Response, next: Function) => {
  response.setHeader('content-type', 'application/json; charset=utf-8');
  next();
};
