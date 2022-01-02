import './TodoItem.scss';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckIcon, PencilIcon, TrashIcon } from '@primer/octicons-react';
import { BORDER_COLOR, H6_FONT_SIZE, PRIMARY_FONT_COLOR } from '../../styled-components/commonVariable';
import { TodoItemInterface } from './todoUtils';
import { StyledInput, StyledButton } from '../../styled-components';

const TodoItemLabel = styled.label`
  flex-grow: 1;
  height: 100%;
  padding: 0px 5px;
  border-bottom: 1px solid ${BORDER_COLOR};
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${H6_FONT_SIZE};
  color: ${PRIMARY_FONT_COLOR};
`;
const TodoItemInput = styled(StyledInput)`
  flex-grow: 1;
  padding: 0 5px;
  font-size: ${H6_FONT_SIZE};
`;

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

  const handleFocus = (evt: any) => {
    evt.currentTarget.select();
  };
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
    updateItem(itemOnEditing);
  };
  return (
    <li className={`TodoItem TodoItem--${item.type}`}>
      {
        isTriggerEditMode
          ? (
            <TodoItemInput
              data-qa="todo-item-edit-input"
              value={itemOnEditing.label}
              autoFocus
              onFocus={(evt) => handleFocus(evt)}
              onChange={(evt) => updateItemOnEditing({
                label: evt.target.value, type: itemOnEditing.type,
              })}
              onKeyPress={(evt) => handleKeyPressEvt(evt)}
              onBlur={() => updateItem(itemOnEditing)}
            />
          )
          : (
            <TodoItemLabel
              data-qa="todo-item-label"
              onDoubleClick={() => setIsTriggerEditMode(true)}
            >
              {item.label}

            </TodoItemLabel>
          )
      }
      <menu className="TodoItem__menu">
        <li className="TodoItem__menuItem">
          {
            isTriggerEditMode
              ? (
                <StyledButton
                  data-qa="update-item-btn"
                  variant="ghost"
                  disabled={!itemOnEditing.label}
                  onClick={() => setIsTriggerEditMode(false)}
                >
                  <CheckIcon />
                </StyledButton>
              )
              : (
                <StyledButton
                  variant="ghost"
                  data-qa="edit-item-btn"
                  onClick={() => setIsTriggerEditMode(true)}
                >
                  <PencilIcon />
                </StyledButton>
              )
          }
        </li>
        <li>
          <StyledButton
            variant="danger"
            data-qa="delete-item-btn"
            onClick={() => deleteItem(item.id)}
          >
            <TrashIcon />
          </StyledButton>
        </li>
      </menu>
    </li>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
