import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { nanoid } from 'nanoid';
import './TodoView.scss';
import {
  TodoInterface,
  TodoItemInterface,
  DeleteTodoItemInterface,
  CreateTodoItemInterface,
  handleException,
  createNewTodo,
  createNewTodoItem,
  findTodoIndexByTodoId,
} from '../components/Todo/todoUtils';
import Todo from '../components/Todo/Todo';
import { StyledButton } from '../styled-components';

/** Mock data */
const listData = [
  {
    id: nanoid(), label: 'hello', type: 'danger', checked: false,
  },
  {
    id: nanoid(), label: 'hello', type: 'warning', checked: false,
  },
];
const todosData = [{ todoId: nanoid(), title: 'Untitled Todo', todo: [...listData] }];

/** CRUD of todoIndexList */
const getIndexByTodoId = (todos: TodoInterface[], todoId: string) => R.findIndex(R.propEq('todoId', todoId))(todos);
const createTodoIndexList = (rowNumber: number, todos: TodoInterface[]) => {
  const getPair = (item: TodoInterface) => R.pair(
    item.todoId,
    getIndexByTodoId(todos, item.todoId) % rowNumber,
  );
  const list = R.reduce(
    (acc: [string, number][], item: TodoInterface) => acc.concat([getPair(item)]),
    [],
    todos,
  );
  return R.fromPairs(list);
};

/** Render Component */
const TodoView = function () {
  const [todos, setTodos] = useState(todosData);
  const [rowNumber, setRowNumber] = useState(3);
  const [todoIndexList, setTodoIndexList] = useState(createTodoIndexList(rowNumber, todos));

  const removeTodoIdKeyFromTodoIndexList = (todoId: string) => {
    const { [todoId]: removeTodoList, ...restIndexList } = todoIndexList;
    setTodoIndexList(restIndexList);
  };
  const addTodoAtLastInTodoIndexList = (todoId: string) => {
    const lastValue = R.last(Object.values(todoIndexList)) as number;
    setTodoIndexList({ ...todoIndexList, [todoId]: (lastValue + 1) % rowNumber });
  };
  useEffect(() => {
    if (todos.length > Object.values(todoIndexList).length) {
      const lastTodo = R.last(todos) as TodoInterface;
      const lastTodoId = R.prop('todoId', lastTodo);
      addTodoAtLastInTodoIndexList(lastTodoId);
    }
  }, [todos]);

  const changeTodoItemCheckStatus = ({ todoId = '', todoItem = { id: '', checked: false } }) => {
    const { id } = todoItem;
    const todoIdx = findTodoIndexByTodoId(todos, todoId);
    const todoObj = todos[todoIdx];
    const itemIdx = R.findIndex(R.propEq('id', id))(todoObj.todo);

    return R.equals(itemIdx, -1)
      ? handleException('item is not existed')
      : R.pipe(
        R.merge(todoObj.todo[itemIdx]),
        (item) => R.update(itemIdx, item, todoObj.todo),
        (newTodo) => R.update(todoIdx, { ...todoObj, todo: newTodo }, todos),
        (newTodos) => setTodos(newTodos),
      )(todoItem);
  };
  const addTodoItem = ({ todoId = '', todoItem = {} as CreateTodoItemInterface }) => {
    const todoIdx = findTodoIndexByTodoId(todos, todoId);
    const todoObj = todos[todoIdx];

    R.pipe(
      (val) => createNewTodoItem(val),
      (newItem) => ({ ...todoObj, todo: [...todoObj.todo, newItem] }),
      (newList) => R.update(todoIdx, newList, todos),
      (newTodos) => setTodos(newTodos),
    )(todoItem);
  };
  const updateTodoItem = ({ todoId = '', todoItem = {} as TodoItemInterface }) => {
    const { id } = todoItem;
    const todoIdx = findTodoIndexByTodoId(todos, todoId);
    const todoObj = todos[todoIdx];
    const itemIdx = R.findIndex(R.propEq('id', id))(todoObj.todo);

    return R.equals(itemIdx, -1)
      ? handleException('item is not existed')
      : R.pipe(
        (item) => R.update(itemIdx, item, todoObj.todo),
        (newTodo) => R.update(todoIdx, { ...todoObj, todo: newTodo }, todos),
        (newTodos) => setTodos(newTodos),
      )(todoItem);
  };
  const deleteTodoItem = (param: DeleteTodoItemInterface) => {
    const { todoId, id } = param;
    const todoIdx = findTodoIndexByTodoId(todos, todoId);
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
  const deleteTodo = ({ todoId = '' as string }) => {
    const todoIdx = findTodoIndexByTodoId(todos, todoId);
    const newTodos = R.remove(todoIdx, 1, todos);
    setTodos(newTodos);
    removeTodoIdKeyFromTodoIndexList(todoId);
  };
  const addNewTodo = () => R.pipe(
    (param) => createNewTodoItem(param),
    (newItem) => createNewTodo(newItem),
    (newTodo) => setTodos([...todos, newTodo]),
  )({ label: 'untitled item', type: 'default' });

  return (
    <div className="TodoView" data-qa="todo-view">
      <main className="TodoView__main">
        {
          Array(rowNumber).fill(0).map((number, idx) => (
            <div className="TodoView__column" key={nanoid()}>
              {
                todos.filter((todo: TodoInterface) => todoIndexList[todo.todoId] === idx)
                  .map((todoObj) => (
                    <Todo
                      key={todoObj.todoId}
                      todoId={todoObj.todoId}
                      title={todoObj.title}
                      todo={todoObj.todo}
                      changeTodoItemCheckStatus={(val) => changeTodoItemCheckStatus(val)}
                      addTodoItem={(val) => addTodoItem(val)}
                      updateTodoItem={(val) => updateTodoItem(val)}
                      deleteTodoItem={(val) => deleteTodoItem(val)}
                      deleteTodo={(val) => deleteTodo(val)}
                    />
                  ))
              }
            </div>
          ))
        }
      </main>
      <menu className="TodoView__menu">
        <li>
          <StyledButton
            variant="primary"
            data-qa="add-todo-btn"
            onClick={addNewTodo}
          >
            Add new todo
          </StyledButton>
        </li>
      </menu>
    </div>
  );
};

export default TodoView;
