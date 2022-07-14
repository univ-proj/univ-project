import config from '@/config';
import * as models from '@/persistance/models';
import persistance_lib from '@/persistance';
import seeders_lib from '@/seeders';
import authentication_lib from '@/authentication';

const persistance = persistance_lib(config, models);
const system_auth = authentication_lib(config, persistance);
const seeders = seeders_lib(persistance);

export { persistance, seeders, system_auth };
