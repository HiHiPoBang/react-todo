import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';
import { TodoItemInterface, DeleteTodoItemInterface } from './todoUtils';
import { StyledH2, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from './TodoItem';

const TodoList = function (props: {
  todoId: string,
  todo: TodoItemInterface[],
  addTodoItem: (param: any) => void,
  deleteTodoItem: (param: DeleteTodoItemInterface) => void,
  deleteTodo: () => void
}) {
  const {
    todoId, todo, addTodoItem, deleteTodoItem, deleteTodo,
  } = props;
  const [stateLabel, setLabel] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    addTodoItem({ label: stateLabel, type: 'default' });
    setLabel('');
  };
  return (
    <div className="TodoList">
      <StyledButton onClick={() => deleteTodo()}>X</StyledButton>
      <StyledH2>My Todo</StyledH2>
      <ul className="TodoList__list">
        { todo.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            deleteItem={(id: string) => deleteTodoItem({ todoId, id })}
          />
        ))}
      </ul>
      <form onSubmit={handleFormBeforeSubmit}>
        <StyledInput
          placeholder="Unlabeld"
          value={stateLabel}
          onChange={(event) => setLabel(event.target.value)}
        />
        <StyledButton type="submit">Add</StyledButton>
      </form>
    </div>
  );
};

TodoList.propType = {
  list: PropTypes.array.isRequired,
};

export default TodoList;
