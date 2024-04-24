import React from "react";

import { AnimatePresence } from "framer-motion";
import TodoItem from "../TodoItem/TodoItem";

import { ITodoItem } from "@/types";

import styles from "./styles.module.scss";

interface TodoListProps {
  todosItems: ITodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todosItems }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleItemClick = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleExpandClick = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  return (
    <ul className={styles.container}>
      {todosItems.length > 0 && (
        <AnimatePresence>
          {todosItems.map((todo) => {
            const isSelected = selectedItems.includes(todo._id);
            const isExpanded = expandedItems.includes(todo._id);

            return (
              <TodoItem
                todo={todo}
                key={todo._id}
                handleExpandClick={handleExpandClick}
                handleItemClick={handleItemClick}
                isSelected={isSelected}
                isExpanded={isExpanded}
              />
            );
          })}
        </AnimatePresence>
      )}
    </ul>
  );
};

export default TodoList;
