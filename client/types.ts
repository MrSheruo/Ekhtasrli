export interface authUser {
  id: string;
  username: string;
  email: string;
}

export interface authResponse {
  message: string;
  user: authUser;
  token: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifiedUser {
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
