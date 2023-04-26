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

export interface IMessage {
  id: number;
  content: string;
  authorId: number;
  to: string;
  socketId: string;
  date: string;
  time: string;
  from: IUser;
  messagesByDate: {
    time: string;
    content: string;
    to: string;
    author: Author;
  }[];
}

type Author = {
  id: number;
  name: string;
  email: string;
  picture: string;
};
