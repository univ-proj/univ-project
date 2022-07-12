import config from '@/config';
import * as models from '@/persistance/models';
import persistance_lib from '@/persistance';
import seeders_lib from '@/seeders';

const persistance = persistance_lib(config, models);
const seeders = seeders_lib(persistance);

export { persistance, seeders };
