import React, { useState } from 'react';
import * as R from 'ramda';
import { nanoid } from 'nanoid';
import './TodoView.scss';
import {
  TodoItemInterface,
  DeleteTodoItemInterface,
  TodoItemContentInterface,
  handleException,
  createNewTodo,
  createNewTodoItem,
} from '../components/Todo/todoUtils';
import Todo from '../components/Todo/Todo';
import { StyledButton } from '../styled-components';

const listData = [
  {
    id: nanoid(), label: 'hello', type: 'danger',
  },
  {
    id: nanoid(), label: 'hello', type: 'warning',
  },
];
const todosData = [{ todoId: nanoid(), title: 'Untitled Todo', todo: [...listData] }];

const TodoView = function () {
  const [todos, setTodos] = useState(todosData);
  const addTodoItem = (param: TodoItemContentInterface, todoIdx: number) => {
    const todoObj = todos[todoIdx];

    R.pipe(
      (val) => createNewTodoItem(val),
      (newItem) => ({ ...todoObj, todo: [...todoObj.todo, newItem] }),
      (newList) => R.update(todoIdx, newList, todos),
      (newTodos) => setTodos(newTodos),
    )(param);
  };
  const updateTodoItem = (param: TodoItemInterface, todoIdx: number) => {
    const { id } = param;
    const todoObj = todos[todoIdx];
    const itemIdx = R.findIndex(R.propEq('id', id))(todoObj.todo);

    return R.equals(itemIdx, -1)
      ? handleException('item is not existed')
      : R.pipe(
        (item) => R.update(itemIdx, item, todoObj.todo),
        (newTodo) => R.update(todoIdx, { ...todoObj, todo: newTodo }, todos),
        (newTodos) => setTodos(newTodos),
      )(param);
  };
  const deleteTodoItem = (param: DeleteTodoItemInterface, todoIdx: number) => {
    const { id } = param;
    const todoObj = todos[todoIdx];
    const itemIdx = R.findIndex(R.propEq('id', id))(todoObj.todo);

    return R.equals(itemIdx, -1)
      ? handleException('item is not existed')
      : R.pipe(
        (idx) => R.remove(idx, 1, todoObj.todo),
        (newTodo) => R.update(todoIdx, { ...todoObj, todo: newTodo }, todos),
        (newTodos) => setTodos(newTodos),
      )(itemIdx);
  };
  const deleteTodo = (todoIdx: number) => {
    const newTodos = R.remove(todoIdx, 1, todos);
    setTodos(newTodos);
  };
  const addNewTodo = () => R.pipe(
    (param) => createNewTodoItem(param),
    (newItem) => createNewTodo(newItem),
    (newTodo) => setTodos([...todos, newTodo]),
  )({ label: 'untitled item', type: 'default' });
  return (
    <div className="todoView" data-qa="todo-view">
      {
        todos.map((todoObj, todoIdx) => (
          <Todo
            data-qa={`todo-${todoIdx}`}
            key={todoObj.todoId}
            todoId={todoObj.todoId}
            todo={todoObj.todo}
            addTodoItem={(val: TodoItemContentInterface) => addTodoItem(val, todoIdx)}
            updateTodoItem={(val: TodoItemInterface) => updateTodoItem(val, todoIdx)}
            deleteTodoItem={(val: DeleteTodoItemInterface) => deleteTodoItem(val, todoIdx)}
            deleteTodo={() => deleteTodo(todoIdx)}
          />
        ))
      }
      <div>
        <StyledButton
          data-qa="add-todo-btn"
          onClick={addNewTodo}
        >
          Add new todo
        </StyledButton>
      </div>
    </div>
  );
};

export default TodoView;
