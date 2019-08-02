export type FormType = 'register' | 'edit';

export interface User {
  id?: number;
  name?: string;
  login: string;
  city?: string;
  password: string;
  contact?: string;
}
