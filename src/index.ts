import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import * as healthCheckRoutes from './util/server-health-check';

const app = express();
const BASE_PATH = 'hit-counter-service';

// @ts-ignore
app.use(express.json());
app.use(cors({ origin: true }));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      '-',
      tokens.url(req, res),
      '-',
      'Query:',
      JSON.stringify(req.query),
      '-',
      'Body',
      JSON.stringify(req.body),
      '-',
      'Params',
      JSON.stringify(req.params),
      '-',
      'User ID',
      JSON.stringify(req.userId),
      '-',
      'Status:',
      tokens.status(req, res),
      '-',
      'Response Time:',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

app.use(BASE_PATH, healthCheckRoutes.routes());

const APP_PORT = process.env.APP_PORT ? +process.env.APP_PORT : 3000;

app.listen(APP_PORT, () => {
  console.log(`Node hit counter service app listening at http://localhost:${APP_PORT}`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT - Terminating.');
  // eslint-disable-next-line no-process-exit
  process.exit();
});
