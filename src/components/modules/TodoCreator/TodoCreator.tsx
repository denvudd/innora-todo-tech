import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/app-state";
import { hasKeyword } from "@/utils/utils";
import { addTodos, deleteAllTodos } from "@/redux/slices/todo-slice";
import { v4 as uuid4 } from "uuid";
import { KEYWORDS, OPTIONS } from "./constants";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage/SuccessMessage";
import Modal from "@/components/ui/Modal/Modal";

interface TodoCreatorProps {}

const TodoCreator: React.FC<TodoCreatorProps> = ({}) => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [descrValue, setDescrValue] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [colorValue, setColorValue] = useState<string>("#22C55E".toLowerCase());

  const dispatch = useAppDispatch();
  const todosItems = useAppSelector((state) => state.todos.todosList);

  useEffect(() => {
    const timer = setTimeout(() => {
      showError && setShowError(false);
      showSuccess && setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showError, showSuccess]);

  const handleTodoAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (todoValue === "") {
      setErrMessage("Please, write your Todo!");
      setShowError(true);
      setShowSuccess(false);
    } else if (category === "") {
      setErrMessage("Please, select a category!");
      setShowError(true);
      setShowSuccess(false);
    } else if (category === "Categories") {
      setErrMessage("Please, select a valid  category!");
      setShowError(true);
      setShowSuccess(false);
    } else {
      const isImportant = hasKeyword(todoValue, KEYWORDS) || isChecked;

      dispatch(
        addTodos({
          _id: uuid4().toString(),
          todo: todoValue,
          descr: descrValue,
          category,
          important: isImportant,
          color: colorValue,
        })
      );

      setTodoValue("");
      setDescrValue("");
      setIsChecked(false);
      setShowCheckbox(false);
      setShowError(false);
      setSuccessMessage(`"${todoValue}" added in list`);
      setShowSuccess(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    dispatch(deleteAllTodos());
    setShowModal(false);
  };

  const handleDeleteAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <form className={styles.form}>
      <div className={styles.formContainer}>
        <div className={styles.checkboxWrapper}>
          {showCheckbox && (
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                value=""
                onChange={() => setIsChecked(!isChecked)}
                className={styles.checkbox}
                title="Is important?"
              />
              <span className={styles.checkboxSpan}>Is important?</span>
            </div>
          )}
          <div className={styles.inputWrapper}>
            <input
              onChange={(e) => {
                setTodoValue(e.target.value);
                setShowCheckbox(e.target.value.trim() !== "");
              }}
              value={todoValue}
              type="text"
              placeholder="Enter your todo..."
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <input
            onChange={(e) => setDescrValue(e.target.value)}
            value={descrValue}
            type="text"
            placeholder="Enter your todo description..."
            className={styles.input}
          />
        </div>
        <div className={styles.selectContainer}>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            {OPTIONS.map((option) => {
              return <option key={option._id}>{option.title}</option>;
            })}
          </select>
          <span className={styles.selectArrow}>
            <FaChevronDown />
          </span>
        </div>
      </div>
      <div className={styles.colorPickerContainer}>
        <label className={styles.colorPickerLabel}>Pick the color:</label>
        <div className={styles.colorPickerInputContainer}>
          <input
            type="color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            className={styles.colorPickerInput}
          />
        </div>
      </div>
      <button
        onClick={handleTodoAdd}
        type="submit"
        className={styles.addButton}
      >
        Add Todo
      </button>
      <div className="flex flex-col gap-4">
        {todosItems.length === 0 && (
          <p
            className="text-center py-4 text-base text-yellow-500
           font-titleFont font-medium
             tracking-wide"
          >
            Your Todo list is empty!
          </p>
        )}
        {/* {todosItems.length > 0 && (
          <>
            <TodoList todosItems={todosItems} />
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ y: { type: "spring", stiffness: 120 } }}
              onClick={handleDeleteAllClick}
              className={styles.deleteAllButton}
            >
              Deletе all Todos
            </motion.button>
          </>
        )} */}
      </div>
      {showError && <ErrorMessage message={errMessage} />}
      {showSuccess && <SuccessMessage message={successMessage} />}
      {showModal && (
        <Modal
          handleModalClose={handleModalClose}
          handleModalSubmit={handleModalSubmit}
        >
          <p className={styles.modalMessage}>
            Are you sure you want to
            <span>delete</span> all Todos?
          </p>
        </Modal>
      )}
    </form>
  );
};

export default TodoCreator;
