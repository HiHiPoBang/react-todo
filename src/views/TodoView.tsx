import React, { useState } from 'react';
import * as R from 'ramda';
import { nanoid } from 'nanoid';
import './TodoView.scss';
import TodoList from '../components/TodoList/TodoList';

const listData = [
  {
    id: nanoid(), title: 'hello', desc: 'helloMyworld', type: 'danger',
  },
  {
    id: nanoid(), title: 'hello', desc: '', type: 'warning',
  },
];
interface newTodoParam {
  title: string,
  desc: string,
}
const TodoView = function () {
  const [list, setList] = useState(listData);
  const addTodoItem = (val: newTodoParam) => {
    const id = nanoid();
    return R.pipe(
      R.merge({ id }),
      (obj: {}) => [obj],
      R.concat(list),
      (newList: any) => setList(newList),
    )(val);
  };
  return (
    <div className="TodoView">
      <TodoList list={list} handleSubmit={(val: newTodoParam) => addTodoItem(val)} />
    </div>
  );
};

export default TodoView;
