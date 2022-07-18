import { Staff, Student } from '@univ-project/typedefs';
import axios from './axios';

export function login(
  email: string,
  password: string,
  role: 'student' | 'staff'
) {
  return axios.post(`/auth/login`, {
    email,
    password,
    role,
  }) as Promise<
    | { token: string; user: Student; role: 'student' }
    | { token: string; user: Staff; role: 'staff' }
  >;
}
