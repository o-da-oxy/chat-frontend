import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { AppContext } from '../redux/appContext';
import { useSelector } from 'react-redux';

function Sidebar() {
  const user = useSelector((state: any) => state.user);

  // socket.io
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rooms')
        .then((res) => res.json())
        .then((data) => setRooms(data));
      setCurrentRoom('general');
      socket.emit('join-room', 'general');
      socket.emit('new-user');
    }
  }, [setCurrentRoom, setRooms, socket, user]);

  socket.off('new-user').on('new-user', (payload: any) => {
    setMembers(payload);
  });

  return (
    <>
      <h3>Available rooms</h3>
      <ListGroup>
        {rooms.map((room: string, index: number) => (
          <ListGroup.Item key={index} style={{ cursor: 'pointer' }}>
            {room}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Members</h3>
      <ListGroup>
        {members.map((member: any) => (
          <ListGroup.Item key={member.id} style={{ cursor: 'pointer' }}>
            {member.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
