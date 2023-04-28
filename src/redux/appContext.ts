import { io, Socket } from 'socket.io-client';
import React, { createContext } from 'react';
import {
  IMessage,
  IRoomDescription,
  IRoomRoles,
  IUser,
} from '../models/models';

const SOCKET_URL = 'http://localhost:3000';

export const socket: Socket = io(SOCKET_URL);

export interface AppContextInterface {
  socket: Socket;
  roomsNames: string[];
  setRoomsNames: React.Dispatch<React.SetStateAction<string[]>>;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
  currentRole: string;
  setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
  roomsRoles: IRoomRoles[] | null;
  setRoomsRoles: React.Dispatch<React.SetStateAction<IRoomRoles[]>>;
  roomsDescription: IRoomDescription[] | null;
  setRoomsDescription: React.Dispatch<React.SetStateAction<IRoomDescription[]>>;
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
  currentRole: '',
  setCurrentRole: () => {},
  members: [],
  setMembers: () => {},
  messages: [],
  setMessages: () => {},
  roomsNames: [],
  setRoomsNames: () => {},
  roomsRoles: [],
  setRoomsRoles: () => {},
  roomsDescription: [],
  setRoomsDescription: () => {},
  privateMemberMsg: null,
  setPrivateMemberMsg: () => {},
});
