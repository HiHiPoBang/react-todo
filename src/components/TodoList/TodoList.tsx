import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import './TodoList.scss';
import { StyledH2, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from '../TodoItem';

interface TodoObjInterface {
  id: string,
  title: string,
  desc: string
  type: string
}

const TodoList = function (props: {
  list: TodoObjInterface[],
  handleSubmit: (param: any) => void,
}) {
  const { list, handleSubmit } = props;
  const [stateTitle, setTitle] = useState('');
  const [stateDesc, setDesc] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit({ title: stateTitle, desc: stateDesc, type: 'default' });
    setTitle('');
    setDesc('');
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
          placeholder="Untitled"
          value={stateTitle}
          onChange={(event) => setTitle(event.target.value)}
        />
        <StyledInput
          value={stateDesc}
          onChange={(event) => setDesc(event.target.value)}
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
