import { io, Socket } from 'socket.io-client';
import React, { createContext, useContext } from 'react';
import { IMessage, IUser } from '../models/models';

const SOCKET_URL = 'http://localhost:3000';

export const socket: Socket = io(SOCKET_URL);

export interface AppContextInterface {
  socket: Socket;
  rooms: string[];
  setRooms: React.Dispatch<React.SetStateAction<string[]>>;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
  members: IUser[] | null;
  setMembers: React.Dispatch<React.SetStateAction<IUser[]>>;
  messages: IMessage[] | null;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  privateMemberMsg: IMessage | null | undefined;
  setPrivateMemberMsg: React.Dispatch<
    React.SetStateAction<IMessage | null | undefined>
  >;
}

export const AppContext = createContext<AppContextInterface>({
  socket,
  currentRoom: '',
  setCurrentRoom: () => {},
  members: [],
  setMembers: () => {},
  messages: [],
  setMessages: () => {},
  rooms: [],
  setRooms: () => {},
  privateMemberMsg: null,
  setPrivateMemberMsg: () => {},
});
