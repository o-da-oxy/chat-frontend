import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import '../styles/MessageForm.css';
import { useSelector } from 'react-redux';
import { AppContext } from '../state/appContext';

function MessageForm() {
  const { socket, currentRoom, setMessages, messages, currentRole } =
    useContext(AppContext);
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState('');

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    console.log('room-messages', roomMessages);
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
      <div className="messages-output">
        {user &&
          messages!.map(({ date, messagesByDate }, idx) => (
            <div key={idx}>
              <p style={{ textAlign: 'center', color: '#818c99', margin: '0' }}>
                {date}
              </p>
              {messagesByDate?.map(({ content, time, author }, msgIdx) => (
                <div
                  className={
                    author.email === user?.email
                      ? 'message'
                      : 'incoming-message'
                  }
                  key={msgIdx}
                >
                  <div className="message-inner">
                    <div className="d-flex align-items-center mb-1">
                      <img
                        src={
                          author.id === user?.id ? user.picture : author.picture
                        }
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: 'cover',
                          borderRadius: '50%',
                          marginRight: 10,
                        }}
                      />
                      <p
                        className="message-sender"
                        style={{
                          color: '#0d6efd',
                          fontWeight: 'bold',
                          margin: '0',
                          paddingRight: '10px',
                        }}
                      >
                        {author.id === user?.id && (
                          <>
                            You{' '}
                            {author.currentRole !== '' &&
                              `- ${author.currentRole}`}
                          </>
                        )}

                        {author.id !== user?.id && (
                          <>
                            {author.name}{' '}
                            {author.currentRole !== '' &&
                              `- ${author.currentRole}`}
                          </>
                        )}
                      </p>
                      <p
                        className="message-sender"
                        style={{
                          color: '#818c99',
                          margin: '0',
                        }}
                      >
                        {time}
                      </p>
                    </div>
                    <p className="message-content" style={{ marginLeft: 40 }}>
                      {content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>

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
