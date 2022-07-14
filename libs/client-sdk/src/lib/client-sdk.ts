import axios from './axios';

type ExcludeMatchingProperties<T, V> = Pick<
  T,
  { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T]
>;

type WithId<T> = T & { id: string };
export type IModelsKeys =
  | 'answer'
  | 'class'
  | 'file'
  | 'level'
  | 'quiz'
  | 'student'
  | 'assignment'
  | 'code_description'
  | 'group'
  | 'section'
  | 'attendance'
  | 'course'
  | 'program'
  | 'staff';

export interface IRelation {
  name: string;
  src_model: IModelsKeys;
  src_id: string;
  dst_id?: string;
}

interface IOptions {
  expand: string;
}

export function createResource<T>(
  resourceName: IModelsKeys,
  body: Partial<ExcludeMatchingProperties<T, Array<any>>>,
  options?: IOptions
) {
  return axios.post(`/${resourceName}`, body) as Promise<WithId<T>>;
}

export function updateResource<T>(
  resourceName: IModelsKeys,
  body: WithId<Partial<ExcludeMatchingProperties<T, Array<any>>>>,
  options?: IOptions
) {
  return axios.patch(`/${resourceName}/${body.id}`, body, {
    params: { expand: options?.expand },
  }) as Promise<WithId<T>>;
}

export function getResource<T>(
  resourceName: IModelsKeys,
  id: string,
  options?: IOptions
) {
  return axios.get(`/${resourceName}/${id}`, {
    params: { expand: options?.expand },
  }) as Promise<WithId<T>>;
}

export function listing<T>(
  resourceName: IModelsKeys,
  listingOptions?: {
    search?: string;
    filters?: string;
    page_number?: string;
    sort?: string;
    page_size?: string;
  },
  options?: IOptions
) {
  const params = new URLSearchParams(listingOptions);

  return axios.get(`/${resourceName}?${params.toString()}`, {
    params: { expand: options?.expand },
  }) as Promise<{
    results: WithId<T>[];
    pagination: { count: number; page_number: number; page_size: number };
  }>;
}

export function deleteResource<T>(
  resourceName: IModelsKeys,
  id: string,
  options?: IOptions
) {
  return axios.delete(`/${resourceName}/${id}`, {
    params: { expand: options?.expand },
  }) as Promise<WithId<T>>;
}

/**
 * @template T the listed resources
 */
export function listRelations<T>(relation: IRelation, options?: IOptions) {
  return axios.get(
    `/${relation.src_model}/${relation.src_id}/${relation.name}`,
    {
      params: { expand: options?.expand },
    }
  ) as Promise<WithId<T>[]>;
}

export function createRelations(
  relation: Required<IRelation>,
  options?: IOptions
) {
  return axios.post(
    `/${relation.src_model}/${relation.src_id}/${relation.name}/${relation.dst_id}`
  ) as Promise<void>;
}

export function deleteRelations(
  relation: Required<IRelation>,
  options?: IOptions
) {
  return axios.delete(
    `/${relation.src_model}/${relation.src_id}/${relation.name}/${relation.dst_id}`
  ) as Promise<void>;
}
