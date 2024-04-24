export interface ITodoItem {
  _id: string;
  name: string;
  description: string;
  category: TodoCategoryEnum;
  important: boolean;
  /** HEX value */
  color: string;
}

export enum TodoCategoryEnum {
  Business = "Business",
  Personal = "Personal",
  Other = "Other",
}
