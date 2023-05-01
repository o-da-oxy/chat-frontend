import React, { useContext, useEffect } from 'react';
import { Col, ListGroup, Row, Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from '../state/appContext';
import { useSelector } from 'react-redux';
import '../styles/Sidebar.css';
import { FaQuestion, FaUserCircle } from 'react-icons/fa';
import { IRoomDescription, IRoomRoles } from '../models/models';

interface SidebarProps {
  showDescriptionModal: boolean;
  showRoleModal: boolean;
  modalTitle: string;
  selectedRole: string;
  setSelectedRole: (selectedRole: string) => void;
  handleDescriptionModalClose: () => void;
  handleDescriptionButtonClick: (roomName: string) => void;
  handleRoleModalClose: () => void;
  handleRoleButtonClick: () => void;
  handleRoleSelectChange: any;
}

function Sidebar({
  showDescriptionModal,
  showRoleModal,
  modalTitle,
  selectedRole,
  setSelectedRole,
  handleDescriptionModalClose,
  handleDescriptionButtonClick,
  handleRoleModalClose,
  handleRoleButtonClick,
  handleRoleSelectChange,
}: SidebarProps) {
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

  // set role "" by default
  useEffect(() => {
    if (showRoleModal) {
      setSelectedRole('');
    }
  }, [showRoleModal]);

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
    if (room !== currentRoom) {
      socket.emit('join-room', room, currentRoom);
    }
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
      <h4 style={{ margin: '2px' }}>Available rooms</h4>
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
                  onClick={() => handleDescriptionButtonClick(roomName)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDescriptionButtonClick(roomName);
                    }
                  }}
                  role="button"
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
                >
                  <FaUserCircle style={{ display: 'inline-block' }} />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showDescriptionModal} onHide={handleDescriptionModalClose}>
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
                      .split('\n')
                      .map((paragraph: string, pIndex: number) => (
                        <React.Fragment key={`${index}-${pIndex}`}>
                          {paragraph}
                          <br />
                        </React.Fragment>
                      ))}
                  </div>
                );
              }
              return null;
            }
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDescriptionModalClose}>
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
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleRoleModalClose();
              }}
            >
              <Form.Group controlId="formRoleSelect">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedRole}
                  onChange={handleRoleSelectChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const saveButton = document.getElementById(
                        'roleModalSaveButton'
                      );
                      if (saveButton) {
                        saveButton.click();
                      }
                    }
                  }}
                >
                  {roomsRoles.map((roomRoles: IRoomRoles, index: number) => {
                    if (roomRoles.name === currentRoom) {
                      return roomRoles.roles.map(
                        (role: string, roleIndex: number) => (
                          <option key={`${index}-${roleIndex}`}>{role}</option>
                        )
                      );
                    }
                    return null;
                  })}
                </Form.Control>
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  id="roleModalSaveButton"
                >
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      <h4 style={{ margin: '2px' }}>Members</h4>
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
