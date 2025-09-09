import { createContext, useContext } from "react";

const ModalContext = createContext(null);

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        role="dialog"
        aria-modal="true"
        className="modal-overlay"
        onClick={onClose}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

function Header({ children }) {
  const { onClose } = useContext(ModalContext);

  return (
    <header className="modal__header">
      <h3>{children}</h3>
      <button className="modal__close" aria-label="Cerrar" onClick={onClose}>
        ✕
      </button>
    </header>
  );
}

function Body({ children }) {
  return <div className="modal__body">{children}</div>;
}

function Footer({ children }) {
  return <footer className="modal__footer">{children}</footer>;
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
