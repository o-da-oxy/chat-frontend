import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Sidebar() {
  const rooms = ['Room 1', 'Room 2', 'Room 3'];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
}

export default Sidebar;
