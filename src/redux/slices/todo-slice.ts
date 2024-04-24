import { ITodoItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface TodoState {
  todosList: ITodoItem[];
}

const initialState: TodoState = {
  todosList: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: { payload: ITodoItem }) => {
      state.todosList.push(action.payload);
    },
    deleteSingleTodos: (state, action: { payload: string }) => {
      state.todosList = state.todosList.filter(
        // eslint-disable-next-line no-underscore-dangle
        (element) => element._id !== action.payload
      );
    },
    deleteAllTodos: (state) => {
      state.todosList = [];
    },
  },
});

export const { addTodos, deleteSingleTodos, deleteAllTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
