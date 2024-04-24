import { motion } from "framer-motion";
import { AiFillWarning } from "react-icons/ai";
import styles from "./styles.module.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { type: "string", stiffness: 120 },
      }}
      className={styles.container}
    >
      <p className={styles.paragraph}>
        <span>
          <AiFillWarning />
        </span>{" "}
        {message}
      </p>
    </motion.div>
  );
};

export default ErrorMessage;
