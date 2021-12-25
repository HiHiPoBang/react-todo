import React, { useState } from 'react';
import * as R from 'ramda';
import { nanoid } from 'nanoid';
import './TodoView.scss';
import { TodoObjInterface } from '../components/TodoList/todoUtils';
import TodoList from '../components/TodoList/Todo';
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
interface todoItemParam {
  label: string,
  type: string,
}
interface deleteTodoParam {
  todoId: string,
  id: string,
}
const TodoView = function () {
  const [todos, setTodos] = useState(todosData);
  const createNewTodoItem = (val: todoItemParam) => R.merge({ id: nanoid() }, val);
  const createNewTodo = (val: TodoObjInterface) => ({
    todoId: nanoid(),
    title: 'Untitled todo',
    todo: [val],
  });
  const deleteTodoItem = (param: deleteTodoParam) => {
    const { todoId, id } = param;
  };
  const addTodoItem = (param: todoItemParam, todoIdx: number) => {
    const todoObj = todos[todoIdx];

    R.pipe(
      (val) => createNewTodoItem(val),
      (newItem) => ({ ...todoObj, todo: [...todoObj.todo, newItem] }),
      (newList) => R.update(todoIdx, newList, todos),
      (newTodos) => setTodos(newTodos),
    )(param);
  };
  const addNewTodo = () => R.pipe(
    (param) => createNewTodoItem(param),
    (newItem) => createNewTodo(newItem),
    (newTodo) => setTodos([...todos, newTodo]),
  )({ label: 'untitled item', type: 'default' });
  return (
    <div className="TodoView">
      {
        todos.map((todoObj, index) => (
          <TodoList
            key={todoObj.todoId}
            list={todoObj.todo}
            addTodoItem={(val: todoItemParam) => addTodoItem(val, index)}
          />
        ))
      }
      <div>
        <StyledButton onClick={addNewTodo}>Add new todo</StyledButton>
      </div>
    </div>
  );
};

export default TodoView;
