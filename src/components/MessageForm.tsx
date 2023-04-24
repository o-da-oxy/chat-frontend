import React, { useContext, useState } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import '../styles/MessageForm.css';
import { useSelector } from 'react-redux';
import { AppContext } from '../redux/appContext';

function MessageForm() {
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState('');

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : `0${month}`;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  const todayDate = getFormattedDate();

  socket.off('room-messages').on('room-messages', (roomMessages: any) => {
    setMessages(roomMessages);
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const time = `${today.getHours()}:${minutes}`;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage('');
  }

  return (
    <>
      <div className="messages-output" />
      {!user && (
        <div
          className="alert alert-danger"
          style={{ height: '35px', display: 'flex', alignItems: 'center' }}
        >
          Please login
        </div>
      )}
      {user && (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={11}>
              <FormGroup>
                <Form.Control
                  className="send-message-form"
                  type="text"
                  placeholder="Input a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <Button className="send-message-button" type="submit">
                <i className="fa-solid fa-paper-plane" />
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default MessageForm;
