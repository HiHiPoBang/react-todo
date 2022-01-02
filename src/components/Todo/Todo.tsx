import './Todo.scss';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { XIcon, PlusIcon } from '@primer/octicons-react';
import {
  BORDER_COLOR, SECONDARY_COLOR, H4_FONT_SIZE, convertRemToPixel,
} from '../../styled-components/commonVariable';
import { TodoItemInterface, CreateTodoItemInterface, DeleteTodoItemInterface } from './todoUtils';
import { StyledH2, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from './TodoItem';

const TodoContainer = styled.div`
  min-width: 400px;
  max-width: 400px;
  border: 1px solid ${BORDER_COLOR};
  background: ${SECONDARY_COLOR};
`;

const Todo = function (props: {
  todoId: string,
  title: string,
  todo: TodoItemInterface[],
  addTodoItem: (param: { todoId: string, todoItem: CreateTodoItemInterface }) => void,
  updateTodoItem: (param: { todoId: string, todoItem: TodoItemInterface }) => void,
  deleteTodoItem: (param: DeleteTodoItemInterface) => void,
  deleteTodo: () => void
}) {
  const {
    todoId, title, todo, addTodoItem, updateTodoItem, deleteTodoItem, deleteTodo,
  } = props;
  const [newItemLabel, setNewItemLabel] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    const todoItem = { label: newItemLabel, type: 'default' } as CreateTodoItemInterface;
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
          onClick={() => deleteTodo()}
        >
          <XIcon size={convertRemToPixel(H4_FONT_SIZE)} />
        </StyledButton>
      </header>
      <main className="Todo__main">
        <StyledH2 className="Todo__title">{title}</StyledH2>
        <ul className="Todo__list">
          { todo.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
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
