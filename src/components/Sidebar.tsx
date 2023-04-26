import React, { useContext, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { AppContext } from '../redux/appContext';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Sidebar.css';

function Sidebar() {
  const user = useSelector((state: any) => state.user);

  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    rooms,
    currentRoom,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rooms')
        .then((res) => res.json())
        .then((data) => setRooms(data));
      setCurrentRoom('General');
      socket.emit('join-room', 'General');
      socket.emit('new-user');
    }
  }, [setCurrentRoom, setRooms, socket, user]);

  socket.off('new-user').on('new-user', (payload: any) => {
    setMembers(payload);
  });

  function joinRoom(room: string, isPublic = true) {
    if (!user) {
      return alert('Please login');
    }
    socket.emit('join-room', room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
  }

  function orderIds(id1: number, id2: number) {
    if (id1 > id2) {
      return `${id1}-${id2}`;
    }
    return `${id2}-${id1}`;
  }

  function handlePrivateMemberMsg(member: any) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user.id, member.id);
    joinRoom(roomId, false);
  }

  return (
    <>
      <h3>Available rooms</h3>
      <ListGroup>
        {rooms.map((room: string, index: number) => (
          <ListGroup.Item
            key={index}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {room}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Members</h3>
      <ListGroup>
        {members!.map((member) => (
          <ListGroup.Item
            key={member.id}
            style={{ cursor: 'pointer' }}
            active={privateMemberMsg?.id === member.id}
            onClick={() => handlePrivateMemberMsg(member)}
            disabled={member.id === user.id}
          >
            <Row>
              <Col xs={2} className="member-status">
                <img src={member.picture} className="member-status-img" />
                {member.status === 'online' ? (
                  <i className="fas fa-circle sidebar-online-status" />
                ) : (
                  <i className="fas fa-circle sidebar-offline-status" />
                )}
              </Col>
              <Col xs={9}>
                {member.name}
                {member.id === user?.id && ' (You)'}
                {member.status === 'offline' && ' (Offline)'}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
