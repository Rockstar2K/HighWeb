import React, { createContext, useContext, useState } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  title: string;
  openModal: (title?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('Contáctanos');

  const openModal = (modalTitle: string = 'Contáctanos') => {
    setTitle(modalTitle);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, title, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = (): ContactModalContextType => {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
};
