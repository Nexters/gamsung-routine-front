import { useState, useCallback } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    openModal,
    closeModal,
  };
};

export default useModal;
