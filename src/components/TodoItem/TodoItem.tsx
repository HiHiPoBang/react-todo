import React from 'react';
import PropTypes from 'prop-types';
import { StyledH5 } from '../../styled-components';

const TodoItem = function ({
  item = {
    id: '' as string,
    title: '' as string,
    desc: '' as string,
    type: '' as string,
  },
}) {
  const {
    id, title, desc, type,
  } = item;
  return (
    <li className={type}>
      <div>
        <StyledH5>{title}</StyledH5>
        <span>{id}</span>
        <p>{desc}</p>
      </div>
    </li>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
