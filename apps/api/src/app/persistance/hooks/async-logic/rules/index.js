import { queue } from '@/components';

const rules = {
  'POST answer': require('@/persistance/hooks/async-logic/triggers/answer')
    .onPost,
  'PATCH answer': require('@/persistance/hooks/async-logic/triggers/answer')
    .onPatch,
};

queue.subscribe_to_topics(rules, 'async');
