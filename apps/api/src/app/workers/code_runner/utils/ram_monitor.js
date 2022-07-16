import config from '@/config';
import * as pidusage from 'pidusage';

export default async function ram_monitor(
  subprocess,
  max_byte_usage = config.pid_max_ram_usage
) {
  const ram_monitor_interval = setInterval(monitor_ram_usage, 100);

  async function monitor_ram_usage() {
    const { memory } = await pidusage(subprocess.pid);
    if (memory > max_byte_usage) {
      subprocess.kill();
      pidusage.clear();
      clearInterval(ram_monitor_interval);
      throw new Error(`RAM exceeded ${max_byte_usage} bytes`);
    }
  }

  return ram_monitor_interval;
}
