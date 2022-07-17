import logger from '@/logger';
import * as child_process from 'child_process';
import * as util from 'util';

// import ram_monitor from '../utils/ram_monitor';

const exec = util.promisify(child_process.exec);

export async function run(code) {
  try {
    const subprocess = exec(`python -c '${code}'`);

    // const ram_monitor_interval = await ram_monitor(subprocess);

    const result = await subprocess;

    return result.stdout || result.stdout;

    // clearInterval(ram_monitor_interval);
  } catch (e) {
    logger.error('error during parsing python code');
    return null;
  }
}
