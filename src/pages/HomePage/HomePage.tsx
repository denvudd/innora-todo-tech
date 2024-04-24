import React from "react";

import styles from "./styles.module.scss";
import TodoCreator from "@/components/modules/TodoCreator/TodoCreator";
import Categories from "@/components/modules/Categories/Categories";
import { useAppSelector } from "@/hooks/app-state";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const todosItems = useAppSelector((state) => state.todos.todosList);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDo Application</h1>
      {!!todosItems.length && <Categories />}
      <TodoCreator />
    </div>
  );
};

export default HomePage;
