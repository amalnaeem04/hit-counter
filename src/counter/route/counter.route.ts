//This file contains routes for counter
import express, { Router } from 'express';
import * as counterController from '../controller/counter.controller';

const router = express.Router();

/**
 *   Returns number of hits in last 60 seconds
 */
export function routes(): Router {
  router.route('/api/v1/hit').get(counterController.getServerHits);

  return router;
}
