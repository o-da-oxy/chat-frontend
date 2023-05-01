import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
import useModalHook from '../components/useModalHook';

function Chat() {
  const {
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
  } = useModalHook();

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar
            showDescriptionModal={showDescriptionModal}
            showRoleModal={showRoleModal}
            modalTitle={modalTitle}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            handleDescriptionModalClose={handleDescriptionModalClose}
            handleDescriptionButtonClick={handleDescriptionButtonClick}
            handleRoleModalClose={handleRoleModalClose}
            handleRoleButtonClick={handleRoleButtonClick}
            handleRoleSelectChange={handleRoleSelectChange}
          />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
