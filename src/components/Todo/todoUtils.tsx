import * as R from 'ramda';
import { nanoid } from 'nanoid';

export interface TodoItemInterface {
  id: string,
  label: string,
  type: string
}
export interface TodoInterface {
  todoId: string,
  title: string,
  todo: TodoItemInterface[]
}
export interface CreateTodoItemInterface {
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
export const createNewTodoItem = (val: CreateTodoItemInterface) => R.merge({ id: nanoid() }, val);

export const findTodoIndexByTodoId = (todos: TodoInterface[], todoId: string) => {
  const todoIdx = R.findIndex(R.propEq('todoId', todoId))(todos) as any;
  return R.equals(todoIdx, -1)
    ? handleException('item is not existed')
    : todoIdx;
};
