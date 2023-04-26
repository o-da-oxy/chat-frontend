import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { AppContext, socket } from './redux/appContext';
import { IMessage, IUser } from './models/models';

function App() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('');
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
        rooms,
        setRooms,
        privateMemberMsg,
        setPrivateMemberMsg,
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
