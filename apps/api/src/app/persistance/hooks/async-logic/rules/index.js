import { queue } from '@/components';

const rules = {};

queue.subscribe_to_topics(rules, 'async');
