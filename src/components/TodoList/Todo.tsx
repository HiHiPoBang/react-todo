import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';
import { TodoObjInterface } from './todoUtils';
import { StyledH2, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from './TodoItem';

const TodoList = function (props: {
  list: TodoObjInterface[],
  addTodoItem: (param: any) => void,
}) {
  const { list, addTodoItem } = props;
  const [stateLabel, setLabel] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    addTodoItem({ label: stateLabel, type: 'default' });
    setLabel('');
  };
  return (
    <div className="TodoList">
      <StyledH2>My Todo</StyledH2>
      <ul className="TodoList__list">
        { list.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
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
