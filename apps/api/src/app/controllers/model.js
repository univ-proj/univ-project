import * as express from 'express';
import { persistance } from '@/components';

const model_router = express.Router();

/**
 * @typedef {oneOf|Answer|Assignment|Attendance|Class|CodeDescription|Course|File|Group|Level|Program|Quiz|Section|Staff|Student} ResponseModal
 */

/**
 * GET /api/{model_name}
 * @tags Model
 * @description List a resource
 * @summary listing
 * @security BearerAuth
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} search.query - search text to search the entities
 * @param {string} filters.query - key value pairs to filter by
 * @param {number} page_number.query - required page number
 * @param {number} page_size.query - required page size
 * @param {string} sort.query - <attribute_name> for asc & -<attribute_name> for desc
 * @param {string} expand.query - expand
 * @return {ResponseModal} 200 - success response
 */
model_router.get('/:model_name/', async (req, res) => {
  const { model_name } = req.params;
  const { search, filters, page_number, sort, page_size, expand } = req.query;

  const fetched_object = await persistance.listing(
    model_name,
    {
      search,
      filters,
      page_number,
      sort,
      page_size,
    },
    {
      expand,
    }
  );

  res.json(fetched_object);
});

/**
 * GET /api/{model_name}/{id}
 * @tags Model
 * @description Find specific resource by specifying the model_name and the id
 * @summary find modal by id
 * @security BearerAuth
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} id.path.required - resource id
 * @param {string} expand.query - expand
 * @return {ResponseModal} 200 - success response
 */
model_router.get('/:model_name/:id', async (req, res) => {
  const { model_name, id } = req.params;

  const fetched_object = await persistance.get_object(
    { model_name, id },
    {
      expand: req.query.expand,
    }
  );

  res.json(fetched_object);
});

/**
 * POST /api/{model_name}
 * @tags Model
 * @description create new resource by specifying the model_name and the id
 * @summary create new resource
 * @security BearerAuth
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {ResponseModal} request.body.required - create object body - application/json
 * @return {ResponseModal} 201 - success response
 */
model_router.post('/:model_name', async (req, res) => {
  const { model_name } = req.params;

  const created_object = await persistance.create_object(
    {
      model_name,
      ...req.body,
    },
    {}
  );

  res.status(201).json(created_object);
});

/**
 * PATCH /api/{model_name}/{id}
 * @tags Model
 * @description update resource of the specified id
 * @summary Patch Update resource
 * @security BearerAuth
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} id.path.required - resource id
 * @param {ResponseModal} request.body.required - update object body - application/json
 * @param {string} expand.query - expand
 * @return {ResponseModal} 200 - success response
 */
model_router.patch('/:model_name/:id', async (req, res) => {
  const { model_name, id } = req.params;

  const updated_object = await persistance.update_object(
    {
      model_name,
      id,
      ...req.body,
    },
    {
      expand: req.query.expand,
    }
  );

  res.json(updated_object);
});

/**
 * DELETE /api/{model_name}/{id}
 * @tags Model
 * @description delete the resource of the specified id
 * @summary Delete resource
 * @security BearerAuth
 * @param {string} model_name.path.required - enum:answer,class,file,level,quiz,student,assignment,code_description,group,section,attendance,course,program,staff
 * @param {string} id.path.required - resource id
 * @param {string} expand.query - expand
 * @return {ResponseModal} 200 - success response
 */
model_router.delete('/:model_name/:id', async (req, res) => {
  const { model_name, id } = req.params;

  const deleted_object = await persistance.delete_object(
    { model_name, id },
    {
      expand: req.query.expand,
    }
  );

  res.json(deleted_object);
});

export default model_router;
