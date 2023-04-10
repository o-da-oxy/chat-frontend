import React from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import '../styles/MessageForm.css';

function MessageForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <div className="messages-output" />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <FormGroup>
              <Form.Control
                className="send-message-form"
                type="text"
                placeholder="Input a message..."
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
    </>
  );
}

export default MessageForm;
