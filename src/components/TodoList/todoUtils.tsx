export interface TodoItemInterface {
  id: string,
  label: string,
  type: string
}
export interface TodoItemContentInterface {
  label: string,
  type: string,
}
export interface DeleteTodoItemInterface {
  todoId: string,
  id: string,
}
