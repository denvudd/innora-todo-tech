import React from "react";

import styles from "./styles.module.scss";
import TodoCreator from "@/components/modules/TodoCreator/TodoCreator";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDo Application</h1>
      <TodoCreator />
    </div>
  );
};

export default HomePage;
