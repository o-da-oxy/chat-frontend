import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { AppContext, socket } from './state/appContext';
import { IMessage, IRoomDescription, IRoomRoles, IUser } from './models/models';

function App() {
  const [roomsNames, setRoomsNames] = useState<string[]>([]);
  const [roomsRoles, setRoomsRoles] = useState<IRoomRoles[]>([]);
  const [roomsDescription, setRoomsDescription] = useState<IRoomDescription[]>(
    []
  );
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<string>('');
  const [members, setMembers] = useState<IUser[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState<
    IMessage | null | undefined
  >();
  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        roomsNames,
        setRoomsNames,
        roomsRoles,
        setRoomsRoles,
        roomsDescription,
        setRoomsDescription,
        privateMemberMsg,
        setPrivateMemberMsg,
        currentRole,
        setCurrentRole,
      }}
    >
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
