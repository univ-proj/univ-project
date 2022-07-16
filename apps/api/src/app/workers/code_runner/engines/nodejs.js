import * as child_process from 'child_process';
import * as util from 'util';
// import ram_monitor from '../utils/ram_monitor';

const exec = util.promisify(child_process.exec);

export async function run(code) {
  try {
    const subprocess = exec(`node -e '${code}'`);

    // const ram_monitor_interval = await ram_monitor(subprocess?.pid);

    const result = await subprocess;

    return result.stdout;
    // clearInterval(ram_monitor_interval);
  } catch (e) {
    return null;
  }
}
