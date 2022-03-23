import { INTERNAL_SERVER_ERROR } from '../../constants';
import { AppError } from '../../util/error-handler';
// eslint-disable-next-line @typescript-eslint/no-var-requires,node/no-unsupported-features/node-builtins
const fsp = require('fs').promises;

/**
 *method to return server hits in last 60 seconds
 */
export async function getServerHits(): Promise<number> {
  try {
    const currentDate: Date = new Date();

    //read content from the database/file
    const fileContent = await fsp.readFile('database.txt', 'utf8');
    const hits = JSON.parse(fileContent);
    hits.push(currentDate);

    //filter out hits within last 60 seconds
    const lastMinuteHits = hits.filter((word) => {
      console.log(word);
      // @ts-ignore
      if ((currentDate - new Date(word)) / 1000 <= 60) {
        return true;
      }
    });

    //write back to file
    await fsp.writeFile('database.txt', JSON.stringify(lastMinuteHits), function (err) {
      if (err) {
        throw err;
      }
    });

    return lastMinuteHits.length;
  } catch (e) {
    console.error(e);
    throw new AppError(e.toString(), INTERNAL_SERVER_ERROR);
  }
}
