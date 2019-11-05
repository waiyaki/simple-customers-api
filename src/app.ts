import * as express from 'express';
import { Connection } from 'typeorm';

export interface IDeps {
  connection: Connection;
}

function depsMiddleware(deps: IDeps) {
  return (req, res, next) => {
    req.deps = deps;
    next();
  };
}

export function configure(deps: IDeps): express.Application {
  const app = express();

  app.use(depsMiddleware(deps));

  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello world!' });
  });

  return app;
}
