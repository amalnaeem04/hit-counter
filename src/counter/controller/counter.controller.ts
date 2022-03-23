import { Request, Response } from 'express';
import * as counterService from '../service/counter.service';
import { RESPONSE_OK } from '../../constants';

/**
 *controller to return server hits in last 60 seconds
 *
 * @param  {Request} req request
 * @param  {Response} res response
 */
export async function getServerHits(req: Request, res: Response): Promise<Response> {
  try {
    const hits = await counterService.getServerHits();
    return res.status(RESPONSE_OK).json(hits);
  } catch (e) {
    console.error('[CounterController][getServerHits] Failed to get server hits in last minute', e);
    return res.status(e.statusCode).send({ message: e.message });
  }
}
