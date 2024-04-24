import React from "react";
import { motion } from "framer-motion";
import { MdDelete, MdBusinessCenter } from "react-icons/md";
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs";
import { VscEllipsis } from "react-icons/vsc";

import { useAppDispatch } from "@/hooks/app-state";
import { ITodoItem } from "@/types";

import styles from "./styles.module.scss";
import { deleteSingleTodos } from "@/redux/slices/todo-slice";

interface TodoItemProps {
  todo: ITodoItem;
  handleItemClick: (itemId: string) => void;
  handleExpandClick: (itemId: string) => void;
  isSelected: boolean;
  isExpanded: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleItemClick,
  handleExpandClick,
  isSelected,
  isExpanded,
}) => {
  const dispatch = useAppDispatch();
  console.log(todo);

  return (
    <motion.li
      onClick={() => handleItemClick(todo._id)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ x: -10, opacity: 0 }}
      style={
        isSelected
          ? {
              borderRightColor: "rgb(124 45 18)",
              borderColor: "rgb(249 115 22)",
            }
          : { borderRightColor: todo.color, borderColor: todo.color }
      }
      className={styles.container}
    >
      <div className={styles.name}>
        <div style={{ color: todo.important ? "red" : "white" }}>
          {todo.name}
        </div>

        {todo.category === "Personal" && (
          <span className={styles.category}>
            <BsFillPersonFill style={{display: "block"}} />
          </span>
        )}
        {todo.category === "Business" && (
          <span className={styles.category}>
            <MdBusinessCenter style={{display: "block"}} />
          </span>
        )}
        {todo.category === "Others" && (
          <span className={styles.category}>
            <VscEllipsis style={{display: "block"}} />
          </span>
        )}
      </div>
      <div className={styles.panelContainer}>
        <span
          onClick={() => handleExpandClick(todo._id)}
          className={styles.panelExpand}
          style={{ display: !todo.description.length ? "none" : "block" }}
        >
          <BsFillCaretDownFill />
        </span>
        <span
          onClick={() => dispatch(deleteSingleTodos(todo._id))}
          className={styles.panelDelete}
        >
          <MdDelete />
        </span>
      </div>
      {isExpanded && !!todo.description.length && (
        <motion.div
          className={styles.message}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p>{todo.description}</p>
        </motion.div>
      )}
    </motion.li>
  );
};

export default TodoItem;
