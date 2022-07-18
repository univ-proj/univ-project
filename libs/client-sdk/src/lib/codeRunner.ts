import axios from './axios';

export function run(code: string, env: 'javascript' | 'python') {
  return axios.post(`/code/${env}/run`, {
    code,
  }) as Promise<string>;
}
