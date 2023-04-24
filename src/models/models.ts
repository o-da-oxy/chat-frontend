export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  picture: string;
  status?: string;
  newMessages?: object[];
}

export interface IUserLoginForm {
  email: string;
  password: string;
}
