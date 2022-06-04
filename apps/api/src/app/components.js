import config from '@/config';
import * as models from '@/persistance/models';
import persistance_lib from '@/persistance';

const persistance = persistance_lib(config, models);

export { persistance };
