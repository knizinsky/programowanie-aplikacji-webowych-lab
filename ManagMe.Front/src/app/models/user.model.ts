export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

type UserRole = 'admin' | 'devops' | 'developer';
