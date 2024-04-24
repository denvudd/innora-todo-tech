export interface ITodoItem {
  _id: string;
  name: string;
  description: string;
  category: TodoCategoryKey;
  important: boolean;
  /** HEX value */
  color: string;
}

export enum TodoCategoryEnum {
  Business = "Business",
  Personal = "Personal",
  Others = "Others",
}

export type TodoCategoryKey = keyof typeof TodoCategoryEnum;
