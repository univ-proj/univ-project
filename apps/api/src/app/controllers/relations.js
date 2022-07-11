import { persistance } from '@/components';
import * as express from 'express';

const relations_router = express.Router();

/**
 * @typedef {oneOf|array<Answer>|array<Assignment>|array<Attendance>|array<Class>|array<CodeDescription>|array<Course>|array<File>|array<Group>|array<Level>|array<Program>|array<Quiz>|array<Section>|array<Staff>|array<Student>} ListingResponseModal
 */

/**
 * GET /api/{src_model}/{src_id}/{relation_name}
 * @tags Model
 * @description list all objects that has relation of relation name with the src modal with id :src_id
 * @summary list modal relation
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} src_id.path.required - resource id
 * @param {string} relation_name.path.required - relation name
 * @return {ListingResponseModal} 200 - success response
 */
relations_router.get('/:src_model/:src_id/:relation_name', async (req, res) => {
  const result = await persistance.list_relations({
    name: req.params.relation_name,
    src_model: req.params.src_model,
    src_id: req.params.src_id,
  });
  res.json(result);
});

/**
 * POST /api/{src_model}/{src_id}/{relation_name}/{dst_id}
 * @tags Model
 * @description create relation of specified :relation_name between :src_modal of :src_id and modal of :dst_id
 * @summary create relation
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} src_id.path.required - resource id
 * @param {string} relation_name.path.required - relation name
 * @param {string} dst_id.path.required - destination modal id
 * @return {void} 200 - success response
 */
relations_router.post(
  '/:src_model/:src_id/:relation_name/:dst_id',
  async (req, res) => {
    const { src_model, relation_name, src_id, dst_id } = req.params;

    await persistance.create_relation({
      name: relation_name,
      dst_id,
      src_model,
      src_id,
    });

    res.status(200).end();
  }
);

/**
 * DELETE /api/{src_model}/{src_id}/{relation_name}/{dst_id}
 * @tags Model
 * @description delete relation of specified :relation_name between :src_modal of :src_id and modal of :dst_id
 * @summary delete relation
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} src_id.path.required - resource id
 * @param {string} relation_name.path.required - relation name
 * @param {string} dst_id.path.required - destination modal id
 * @return {void} 200 - success response
 */
relations_router.delete(
  '/:src_model/:src_id/:edge_name/:dst_id',
  async (req, res) => {
    const { src_model, relation_name, src_id, dst_id } = req.params;

    await persistance.delete_relation({
      name: relation_name,
      dst_id,
      src_model,
      src_id,
    });

    res.status(200).end();
  }
);
export default relations_router;
