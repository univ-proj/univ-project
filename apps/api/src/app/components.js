import config from '@/config';
import * as models from '@/persistance/models';
import persistance_lib from '@/persistance';
import seeders_lib from '@/seeders';
import queue_lib from '@/queue';
import authentication_lib from '@/authentication';
import workers_lib from '@/workers';

const queue = queue_lib(config);
const persistance = persistance_lib(config, models, queue);
const system_auth = authentication_lib(config, persistance);
const workers = workers_lib();
const seeders = seeders_lib(persistance);

export { persistance, seeders, system_auth, queue, workers };
