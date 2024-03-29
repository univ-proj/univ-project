import create_error from './create_error';

export const unknown_error = create_error(500, 'unknown_error');
export const invalid_db_relation = create_error(500, 'invalid_db_relation');
export const invalid_db_uri = create_error(500, 'invalid_db_uri');
export const model_not_found = create_error(404, 'model_not_found');
export const invalid_expands_query = create_error(400, 'invalid_expands_query');
export const not_found = create_error(404, 'not_found');

export const invalid_resource = create_error(400, 'invalid_resource');
export const validation_error = create_error(400, 'validation_error');

export const invalid_token = create_error(401, 'invalid_token');
export const token_required = create_error(401, 'token_required');

export const invalid_search_query = create_error(400, 'invalid_search_query');
export const invalid_filter = create_error(400, 'invalid_filter');

export const user_does_not_exist = create_error(401, 'user_does_not_exist');
export const invalid_credentials = create_error(401, 'invalid_credentials');
export const expired_token = create_error(401, 'expired_token');
export const unauthorized = create_error(401, 'unauthorized');

export const engine_not_supported = create_error(400, 'engine_not_supported');
