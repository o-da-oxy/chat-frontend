import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/chat_icon.png';
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../redux/appApi';

function Navigation() {
  const user = useSelector((state: any) => state.user);

  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: 50, height: 50 }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <LinkContainer to="/chat">
                <Nav.Link>Chat</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Log in</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}
            {user && (
              <NavDropdown
                style={{ position: 'relative' }}
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="danger"
                    style={{
                      width: '100%',
                      margin: '0',
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
