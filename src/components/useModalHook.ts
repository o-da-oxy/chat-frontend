import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../state/appContext';

export default function useModalHook() {
  const user = useSelector((state: any) => state.user);

  const { socket, currentRoom, setCurrentRole } = useContext(AppContext);

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // description

  const handleDescriptionModalClose = () => {
    setShowDescriptionModal(false);
  };

  const handleDescriptionButtonClick = (roomName: string) => {
    setModalTitle(roomName);
    setShowDescriptionModal(true);
  };

  // role

  const handleRoleModalClose = () => {
    setShowRoleModal(false);
    setCurrentRole(selectedRole);
    const userId = user.id;
    socket.emit('update-role', { userId, currentRoom, selectedRole }); // передать на бэк;
  };

  const handleRoleButtonClick = () => {
    setShowRoleModal(true);
  };

  const handleRoleSelectChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  return {
    showDescriptionModal,
    showRoleModal,
    modalTitle,
    selectedRole,
    handleDescriptionModalClose,
    handleDescriptionButtonClick,
    handleRoleModalClose,
    handleRoleButtonClick,
    handleRoleSelectChange,
  };
}
