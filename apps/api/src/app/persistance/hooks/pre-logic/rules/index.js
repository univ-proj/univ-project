import { queue } from '@/components';

const rules = {
  'POST student': require('@/persistance/hooks/pre-logic/triggers/student')
    .onPost,
  'PATCH student': require('@/persistance/hooks/pre-logic/triggers/student')
    .onPatch,
  'POST answer': require('@/persistance/hooks/pre-logic/triggers/answer')
    .onPost,
  'PATCH answer': require('@/persistance/hooks/pre-logic/triggers/answer')
    .onPatch,
  'POST staff': require('@/persistance/hooks/pre-logic/triggers/staff').onPost,
  'PATCH staff': require('@/persistance/hooks/pre-logic/triggers/staff')
    .onPatch,
};

queue.subscribe_to_topics(rules, 'pre');
