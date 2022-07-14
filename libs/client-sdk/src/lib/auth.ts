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
  }) as Promise<string>;
}
