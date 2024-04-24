import { motion } from "framer-motion";
import { MdOutlineDone } from "react-icons/md";
import styles from "./styles.module.scss";

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
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
          <MdOutlineDone />
        </span>{" "}
        {message}
      </p>
    </motion.div>
  );
};

export default SuccessMessage;
