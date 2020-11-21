export interface UserSession {
  id: number;
  email?: string;
  name: string;
  avatar?: string;
  token: string;
}
