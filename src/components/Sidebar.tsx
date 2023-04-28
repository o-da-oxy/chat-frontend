import React, { useContext, useEffect, useState } from 'react';
import { Col, ListGroup, Row, Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from '../redux/appContext';
import { useSelector } from 'react-redux';
import '../styles/Sidebar.css';
import { FaQuestion, FaUserCircle } from 'react-icons/fa';
import { IRoomDescription, IRoomRoles } from '../models/models';

function Sidebar() {
  const user = useSelector((state: any) => state.user);

  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    setRoomsNames,
    roomsNames,
    roomsRoles,
    setRoomsRoles,
    roomsDescription,
    setRoomsDescription,
    currentRole,
    setCurrentRole,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rooms/names')
        .then((res) => res.json())
        .then((data) => setRoomsNames(data));
      setCurrentRoom('General');
      socket.emit('join-room', 'General');
      socket.emit('new-user');
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rooms/roles')
        .then((res) => res.json())
        .then((data) => setRoomsRoles(data));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rooms/descriptions')
        .then((res) => res.json())
        .then((data) => setRoomsDescription(data));
    }
  }, []);

  socket.off('new-user').on('new-user', (payload: any) => {
    setMembers(payload);
  });

  function joinRoom(room: string, isPublic = true) {
    if (!user) {
      return alert('Please login');
    }
    if (!room) {
      // check undefined
      return;
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

  // modal

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleQuestionModalClose = () => {
    setShowQuestionModal(false);
  };

  const handleRoleModalClose = () => {
    setShowRoleModal(false);
    setCurrentRole(selectedRole);
  };

  const handleListItemClick = (roomName: string) => {
    setModalTitle(roomName);
    setShowQuestionModal(true);
  };

  const handleRoleButtonClick = () => {
    setShowRoleModal(true);
  };

  const handleRoleSelectChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  return (
    <>
      <h3>Available rooms</h3>
      {roomsNames && roomsNames.length > 0 && (
        <ListGroup className="rooms-list-group-container">
          {roomsNames.map((roomName: string, index: number) => (
            <ListGroup.Item
              key={index}
              active={roomName === currentRoom}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => roomName && joinRoom(roomName)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (roomName) {
                    joinRoom(roomName);
                  }
                }
              }}
              role="button"
            >
              {roomName}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  style={{
                    backgroundColor:
                      roomName === currentRoom ? 'white' : '#0d6efd',
                    color: roomName === currentRoom ? 'black' : 'white',
                    border: 'none',
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => handleListItemClick(roomName)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleListItemClick(roomName);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <FaQuestion style={{ display: 'inline-block' }} />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  style={{
                    backgroundColor:
                      roomName === currentRoom ? 'white' : '#0d6efd',
                    color: roomName === currentRoom ? 'black' : 'white',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={handleRoleButtonClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRoleButtonClick();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <FaUserCircle style={{ display: 'inline-block' }} />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showQuestionModal} onHide={handleQuestionModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roomsDescription!.map(
            (roomDescription: IRoomDescription, index: number) => {
              if (roomDescription.name === currentRoom) {
                return (
                  <div className="room-description" key={index}>
                    {roomDescription.description
                      .split('\n\n')
                      .map((paragraph: string, pIndex: number) => (
                        <p key={`${index}-${pIndex}`}>{paragraph}</p>
                      ))}
                  </div>
                );
              }
              return null;
            }
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleQuestionModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {roomsRoles && roomsRoles.length > 0 && (
        <Modal show={showRoleModal} onHide={handleRoleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select your role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRoleSelect">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedRole}
                  onChange={handleRoleSelectChange}
                >
                  {roomsRoles!.map((roomRoles: IRoomRoles, index: number) => {
                    if (roomRoles.name === currentRoom) {
                      return roomRoles.roles.map(
                        (role: string, roleIndex: number) => (
                          <option
                            key={`${index}-${roleIndex}`}
                            defaultValue={role === '' ? '' : undefined}
                          >
                            {role}
                          </option>
                        )
                      );
                    }
                    return null;
                  })}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRoleModalClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <h3>Members</h3>
      <ListGroup className="members-list-group-container">
        {members!
          .sort((a, b) => (a.id === user.id ? -1 : b.id === user.id ? 1 : 0))
          .map((member) => (
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
