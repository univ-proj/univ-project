import { Staff, Student } from '@univ-project/typedefs';
import axios from './axios';

export function getUserProfile() {
  return axios.get(`/profile`) as Promise<
    { user: Student; role: 'student' } | { user: Staff; role: 'staff' }
  >;
}
