import { useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={style.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={style.modal}>
        <button onClick={onClose} className={style.buttonModal}>
          <img src="./images/x.svg" alt="close" />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}