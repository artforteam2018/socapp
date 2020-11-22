import * as Express from 'express';
import { Err } from 'types';

const responseWithStatus = (response: Express.Response, data: any, status = 200) => {
  let statusEnd = status;
  if (data === undefined && status === 200) {
    statusEnd = 204;
  }
  response.status(statusEnd).end(JSON.stringify(data));
};

export const handleRequest = (response: Express.Response, data: any, status: number = 200) => {
  if (data instanceof Promise) {
    data
      .then((result: any) => {
        responseWithStatus(response, result, status);
      }).catch(async (error: Err) => {
        const status = error.status || 500;
        responseWithStatus(response, { message: error.msg, code: error.code }, status);
      });
  } else {
    responseWithStatus(response, data, status);
  }
};
