import './Todo.scss';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { XIcon, PlusIcon } from '@primer/octicons-react';
import {
  BORDER_COLOR, SECONDARY_COLOR, H4_FONT_SIZE, convertRemToPixel,
} from '../../styled-components/commonVariable';
import { TodoItemInterface, CreateTodoItemInterface, DeleteTodoItemInterface } from './todoUtils';
import { StyledH3, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from './TodoItem';

const TodoContainer = styled.div`
  min-width: 450px;
  max-width: 450px;
  border: 1px solid ${BORDER_COLOR};
  background: ${SECONDARY_COLOR};
`;
const TodoTitle = styled(StyledH3)`
  text-align: center;
`;

const Todo = function (props: {
  todoId: string,
  title: string,
  todo: TodoItemInterface[],
  changeTodoItemCheckStatus: (param: any) => void,
  addTodoItem: (param: { todoId: string, todoItem: CreateTodoItemInterface }) => void,
  updateTodoItem: (param: { todoId: string, todoItem: TodoItemInterface }) => void,
  deleteTodoItem: (param: DeleteTodoItemInterface) => void,
  deleteTodo: (param: { todoId: string }) => void
}) {
  const {
    todoId,
    title,
    todo,
    changeTodoItemCheckStatus,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem, deleteTodo,
  } = props;
  const [newItemLabel, setNewItemLabel] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    const todoItem = { label: newItemLabel, type: 'default', checked: false } as CreateTodoItemInterface;
    addTodoItem({ todoId, todoItem });
    setNewItemLabel('');
  };
  return (
    <TodoContainer className="Todo" data-qa="todo">
      <header className="Todo__header">
        <StyledButton
          data-qa="delete-todo-btn"
          className="Todo__deleteBtn"
          variant="ghost"
          onClick={() => deleteTodo({ todoId })}
        >
          <XIcon size={convertRemToPixel(H4_FONT_SIZE)} />
        </StyledButton>
      </header>
      <main className="Todo__main">
        <TodoTitle className="Todo__title">{`- ${title} -`}</TodoTitle>
        <ul className="Todo__list">
          { todo.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              changeCheckedStatus={(todoItem) => changeTodoItemCheckStatus({ todoId, todoItem })}
              updateItem={
                (todoItem: TodoItemInterface) => updateTodoItem({ todoId, todoItem })
              }
              deleteItem={(id: string) => deleteTodoItem({ todoId, id })}
            />
          ))}
        </ul>
      </main>
      <footer className="Todo__footer">
        <form
          data-qa="todo-form"
          className="Todo__form"
          onSubmit={handleFormBeforeSubmit}
        >
          <StyledInput
            data-qa="add-todo-input"
            className="Todo__addInput"
            placeholder="Please input new todo"
            value={newItemLabel}
            onChange={(event) => setNewItemLabel(event.target.value)}
          />
          <StyledButton
            variant="primary"
            disabled={!newItemLabel}
            type="submit"
            data-qa="add-todo-item-btn"
          >
            <PlusIcon />
          </StyledButton>
        </form>
      </footer>
    </TodoContainer>
  );
};

Todo.propType = {
  list: PropTypes.array.isRequired,
};

export default Todo;
