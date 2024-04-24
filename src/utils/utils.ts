import { ITodoItem, TodoCategoryKey } from "@/types";

export function hasKeyword(query: string, keywords: string[]) {
  return keywords.some((keyword) => query.toLowerCase().includes(keyword));
}

export function filterTodosByCategory(
  todos: ITodoItem[],
  category: TodoCategoryKey
) {
  return todos.filter((element) => element.category === category);
}
