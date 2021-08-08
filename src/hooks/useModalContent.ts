import { useState } from 'react';

const useModalContent = () => {
  const [modalContent, setModalContent] = useState('');
  const [modalSubContent, setModalSubContent] = useState('');
  const [modalLeftButtonText, setModalLeftButtonText] = useState('');
  const [modalRightButtonText, setModalRightButtonText] = useState('');

  return {
    modalContent,
    setModalContent,
    modalSubContent,
    setModalSubContent,
    modalLeftButtonText,
    setModalLeftButtonText,
    modalRightButtonText,
    setModalRightButtonText,
  };
};

export default useModalContent;
