import * as R from 'ramda';
import { nanoid } from 'nanoid';

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
export const handleException = (msg: string) => {
  throw new Error(`Warning: ${msg}`);
};
export const createNewTodo = (val: TodoItemInterface) => ({
  todoId: nanoid(),
  title: 'Untitled todo',
  todo: [val],
});
export const createNewTodoItem = (val: TodoItemContentInterface) => R.merge({ id: nanoid() }, val);
