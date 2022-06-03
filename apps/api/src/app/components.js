import * as models from '@/persistance/models';
import config from '@/config';
import persistance_lib from '@/persistance';

console.log(models);
const persistance = persistance_lib(config, models);

export { persistance };
