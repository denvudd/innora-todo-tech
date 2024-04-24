import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";

interface ModalProps {
  children: React.ReactNode;
  handleModalClose: () => void;
  handleModalSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  handleModalClose,
  handleModalSubmit,
}) => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      handleModalClose();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div onClick={handleModalClose} className={styles.overlay} />
      <div className={styles.container}>
        <span onClick={handleModalClose} className={styles.close}>
          <AiOutlineClose />
        </span>
        {children}
        <div className={styles.panelContainer}>
          <button
            onClick={handleModalSubmit}
            type="button"
            className={styles.panelAccept}
          >
            Yes
          </button>
          <button
            onClick={handleModalClose}
            type="button"
            className={styles.panelDecline}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
