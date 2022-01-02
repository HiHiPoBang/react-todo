import './TodoItem.scss';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckIcon, PencilIcon, TrashIcon } from '@primer/octicons-react';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  BORDER_COLOR,
  H6_FONT_SIZE,
  PRIMARY_FONT_COLOR,
  SECONDARY_COLOR,
} from '../../styled-components/commonVariable';
import { TodoItemInterface } from './todoUtils';
import { StyledInput, StyledButton } from '../../styled-components';

interface CheckedLabelProps {
  isChecked: boolean
}
const TodoItemContainer = styled.li`
  padding: 5px 10px;
  box-sizing: border-box;
  transition: background-color .3s;
  &:hover{
    background-color: ${WHITE_COLOR};
  }
`;
const TodoItemLabel = styled.label`
  position: relative;
  flex-grow: 1;
  height: 100%;
  padding: 0px 5px 0px 1.75rem;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${H6_FONT_SIZE};
  color: ${PRIMARY_FONT_COLOR};
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 1.75rem;
    width: ${(props: CheckedLabelProps) => (props.isChecked ? '100%' : '0px')};
    height: 2px;
    background-color: ${BORDER_COLOR};
    opacity: .5;
    transition: width .3s;
  }
`;
const TodoItemInput = styled(StyledInput)`
  flex-grow: 1;
  padding: 0 5px;
  font-size: ${H6_FONT_SIZE};
`;
const TodoItemCheckboxSpan = styled.span`
  position: absolute;
  top: 1.5px;
  left: 0px;
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 2px;
  border: 1px solid ${BORDER_COLOR};
  background: ${WHITE_COLOR};
  transition: background 0.3s;
  i {
    position: absolute;
    top: -7px;
    left: 1px;
    opacity: 0;
    transition: opacity 0.3s;
  }
`;
const TodoItemCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  &:checked + span {
    background: ${PRIMARY_COLOR};
    color: ${WHITE_COLOR};
  }
  &:checked + span i{
    opacity: 1;
  }
`;

const TodoItem = function (props: {
  item: TodoItemInterface,
  changeCheckedStatus: (param: { id: string, checked: boolean}) => void,
  updateItem: (param: TodoItemInterface) => void,
  deleteItem: (param: string) => void,
}) {
  const {
    item,
    changeCheckedStatus,
    updateItem,
    deleteItem,
  } = props;
  const [isTriggerEditMode, setIsTriggerEditMode] = useState(false);
  const [itemOnEditing, setItemOnEditing] = useState(item);

  const handleFocus = (evt: any) => {
    evt.currentTarget.select();
  };
  const updateItemOnEditing = ({ label = '', type = '' }) => {
    const { id, checked } = item;
    setItemOnEditing({
      id, label, type, checked,
    });
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
    <TodoItemContainer className={`TodoItem TodoItem--${item.type}`}>
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
              isChecked={item.checked}
            >
              {item.label}
              <TodoItemCheckbox
                type="checkbox"
                checked={item.checked}
                onClick={() => changeCheckedStatus({ id: item.id, checked: !item.checked })}
              />
              <TodoItemCheckboxSpan><i><CheckIcon size={16} /></i></TodoItemCheckboxSpan>
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
    </TodoItemContainer>
  );
};

TodoItem.propType = {
  item: PropTypes.object.isRequired,
};

export default TodoItem;
