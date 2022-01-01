import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TodoItemInterface } from './todoUtils';
import { StyledInput, StyledButton } from '../../styled-components';

const TodoItem = function (props: {
  item: TodoItemInterface,
  updateItem: (param: TodoItemInterface) => void,
  deleteItem: (param: string) => void,
}) {
  const {
    item,
    updateItem,
    deleteItem,
  } = props;
  const [isTriggerEditMode, setIsTriggerEditMode] = useState(false);
  const [itemOnEditing, setItemOnEditing] = useState(item);

  const updateItemOnEditing = ({ label = '', type = '' }) => {
    const { id } = item;
    setItemOnEditing({ id, label, type });
  };
  const handleKeyPressEvt = (evt: any) => {
    if (evt.key !== 'Enter') {
      return;
    }
    if (!itemOnEditing.label) {
      return;
    }
    setIsTriggerEditMode(false);
  };
  return (
    <li className={item.type}>
      {
        isTriggerEditMode
          ? (
            <StyledInput
              data-qa="todo-item-edit-input"
              value={itemOnEditing.label}
              onChange={(evt) => updateItemOnEditing({
                label: evt.target.value, type: itemOnEditing.type,
              })}
              onKeyPress={(evt) => handleKeyPressEvt(evt)}
              onBlur={() => updateItem(itemOnEditing)}
            />
          )
          : (
            <span
              data-qa="todo-item-label"
              onDoubleClick={() => setIsTriggerEditMode(true)}
            >
              {item.label}

            </span>
          )
      }
      {
        isTriggerEditMode
          ? (
            <StyledButton
              data-qa="update-item-btn"
              disabled={!itemOnEditing.label}
              onClick={() => setIsTriggerEditMode(false)}
            >
              ok
            </StyledButton>
          )
          : (
            <StyledButton
              data-qa="edit-item-btn"
              onClick={() => setIsTriggerEditMode(true)}
            >
              edit
            </StyledButton>
          )
      }
      <StyledButton
        data-qa="delete-item-btn"
        onClick={() => deleteItem(item.id)}
      >
        delete
      </StyledButton>
    </li>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
