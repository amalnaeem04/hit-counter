import express from 'express';
import * as core from 'express-serve-static-core';
const router = express.Router();

/**
 * function for server health check
 */
export function routes(): core.Router {
  router.route('/ping').get((request, response) => {
    response.status(200).send('OK');
  });

  return router;
}
