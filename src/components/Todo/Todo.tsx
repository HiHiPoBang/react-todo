import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';
import { TodoItemInterface, DeleteTodoItemInterface } from './todoUtils';
import { StyledH2, StyledInput, StyledButton } from '../../styled-components';
import TodoItem from './TodoItem';

const Todo = function (props: {
  todoId: string,
  todo: TodoItemInterface[],
  addTodoItem: (param: any) => void,
  updateTodoItem: (param: TodoItemInterface) => void,
  deleteTodoItem: (param: DeleteTodoItemInterface) => void,
  deleteTodo: () => void
}) {
  const {
    todoId, todo, addTodoItem, updateTodoItem, deleteTodoItem, deleteTodo,
  } = props;
  const [newItemLabel, setNewItemLabel] = useState('');
  const handleFormBeforeSubmit = (e: any) => {
    e.preventDefault();
    addTodoItem({ label: newItemLabel, type: 'default' });
    setNewItemLabel('');
  };
  return (
    <div className="Todo" data-qa="todo">
      <StyledButton
        data-qa="delete-todo-btn"
        onClick={() => deleteTodo()}
      >
        X
      </StyledButton>
      <StyledH2>My Todo</StyledH2>
      <ul className="Todo__list">
        { todo.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            updateItem={(val: TodoItemInterface) => updateTodoItem(val)}
            deleteItem={(id: string) => deleteTodoItem({ todoId, id })}
          />
        ))}
      </ul>
      <form
        data-qa="todo-form"
        onSubmit={handleFormBeforeSubmit}
      >
        <StyledInput
          data-qa="add-todo-input"
          placeholder="Please input new todo"
          value={newItemLabel}
          onChange={(event) => setNewItemLabel(event.target.value)}
        />
        <StyledButton
          type="submit"
          data-qa="add-todo-item-btn"
        >
          Add
        </StyledButton>
      </form>
    </div>
  );
};

Todo.propType = {
  list: PropTypes.array.isRequired,
};

export default Todo;
