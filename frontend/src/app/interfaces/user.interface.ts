// frontend/src/app/interfaces/user.interface.ts
export interface User {
  id: string; // Antes era number
  name: string;
  email: string;
  role: 'ADMIN' | 'DEVELOPER' | 'MANAGER'; // Coincide con el Enum
  city?: string;
  avatar?: string;
}