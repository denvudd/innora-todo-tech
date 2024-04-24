/* eslint-disable id-length */
/* eslint-disable quote-props */
import React from "react";
import { motion } from "framer-motion";
import TodoList from "../TodoList/TodoList";

import { filterTodosByCategory } from "@/utils/utils";
import { useAppSelector } from "@/hooks/app-state";
import { ITodoItem, TodoCategoryKey } from "@/types";

import styles from "./styles.module.scss";

const Categories = () => {
  const [todosByCategory, setTodosByCategory] = React.useState<{
    [key: string]: ITodoItem[];
  }>({
    Personal: [],
    Business: [],
    Others: [],
  });
  const [activeCategory, setActiveCategory] =
    React.useState<TodoCategoryKey>("Personal");
  const todosItem = useAppSelector((state) => state.todos.todosList);

  React.useEffect(() => {
    const categories = Object.keys(todosByCategory);
    const newTodosByCategory: {
      [key: string]: ITodoItem[];
    } = {};

    for (const category of categories) {
      newTodosByCategory[category] = filterTodosByCategory(
        todosItem,
        category as TodoCategoryKey
      );
    }

    setTodosByCategory(newTodosByCategory);
  }, [todosItem]);

  return (
    <motion.div
      className={styles.container}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ x: { type: "spring", damping: 10, stiffness: 50 } }}
    >
      <div className={styles.tabs}>
        <div
          className={styles.tab}
          style={{ color: activeCategory === "Personal" ? "white" : "inherit" }}
          onClick={() => setActiveCategory("Personal")}
        >
          Personal
        </div>
        <div
          className={styles.tab}
          style={{ color: activeCategory === "Business" ? "white" : "inherit" }}
          onClick={() => setActiveCategory("Business")}
        >
          Business
        </div>
        <div
          className={styles.tab}
          style={{ color: activeCategory === "Others" ? "white" : "inherit" }}
          onClick={() => setActiveCategory("Others")}
        >
          Others
        </div>
      </div>
      <div className={styles.todo}>
        {todosByCategory[activeCategory].length === 0 ? (
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              x: { type: "spring", damping: 10, stiffness: 120 },
            }}
            className={styles.todoEmpty}
          >
            Click on the tab to choose your category
          </motion.p>
        ) : (
          <div className={styles.todoList}>
            <h3 className="text-lg mt-3">{activeCategory} Todos:</h3>
            <TodoList todosItems={todosByCategory[activeCategory]} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Categories;
