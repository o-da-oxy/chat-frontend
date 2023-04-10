import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Home.css';

function Home() {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div className="welcome_page">
          <h1>Chat App</h1>
          <p>Make friends and improve your English!</p>
          <LinkContainer to="/chat">
            <Button>
              Get Started! <i className="" />
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home_bg" />
    </Row>
  );
}

export default Home;
