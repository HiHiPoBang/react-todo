import React from 'react';
import PropTypes from 'prop-types';
import { TodoItemInterface } from './todoUtils';
import { StyledButton } from '../../styled-components';

const TodoItem = function (props: {
  item: TodoItemInterface,
  deleteItem: (param: any) => void,
}) {
  const {
    item: { id, label, type },
    deleteItem,
  } = props;
  return (
    <li className={type}>
      <div>
        <span>{label}</span>
        <StyledButton onClick={() => deleteItem(id)}>delete</StyledButton>
      </div>
    </li>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
