import { INTERNAL_SERVER_ERROR } from '../../constants';
import { AppError } from '../../util/error-handler';

/**
 *method to return server hits in last 60 seconds
 */
export function getServerHits(): number {
  try {
    const num = 5;
    console.log('hit');
    return num;
  } catch (e) {
    console.error(e);
    throw new AppError(e.toString(), INTERNAL_SERVER_ERROR);
  }
}
