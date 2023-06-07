import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Home.css';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state: any) => state.user);
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div className="welcome_page">
          <h1>Chat App</h1>
          <p>Make friends and improve your English!</p>
          {user && (
            <LinkContainer to="/chat">
              <Button>
                Get Started! <i className="" />
              </Button>
            </LinkContainer>
          )}
          {!user && (
            <LinkContainer to="/login">
              <Button>
                Get Started! <i className="" />
              </Button>
            </LinkContainer>
          )}
          <p style={{ fontSize: '14px', marginTop: '15px', color: 'gray' }}>
            Suggest a topic for а new room: demskaya01@gmail.com
          </p>
          <p style={{ fontSize: '14px', marginTop: '-15px', color: 'gray' }}>
            Thank you!
          </p>
        </div>
      </Col>
      <Col md={6} className="home_bg" />
    </Row>
  );
}

export default Home;
