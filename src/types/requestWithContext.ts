import * as express from 'express';

export interface RequestWithContext extends express.Request {
  context: any;
}
