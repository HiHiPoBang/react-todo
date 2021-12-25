import React from 'react';
import PropTypes from 'prop-types';
import { TodoObjInterface } from './todoUtils';

const TodoItem = function ({
  item = {} as TodoObjInterface,
}) {
  const {
    id, label, type,
  } = item;
  return (
    <li className={type}>
      <div>
        <span>{label}</span>
        <span>{id}</span>
      </div>
    </li>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
