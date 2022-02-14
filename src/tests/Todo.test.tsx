import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Todo from '../components/Todo/Todo';
import TodoItem from '../components/Todo/TodoItem';

describe('addTodoItem', () => {
  const mockData = {
    todoId: 'todo-1',
    title: 'Untitled Todo',
    todo: [{
      id: 'todo-item-1', label: 'hello', type: 'danger',
    }],
  };
  const props = {
    addTodoItem: jest.fn(),
    updateTodoItem: jest.fn(),
    deleteTodoItem: jest.fn(),
    deleteTodo: jest.fn(),
  };

  const wrapper = shallow(
    <Todo
      todoId={mockData.todoId}
      todo={mockData.todo}
      addTodoItem={props.addTodoItem}
      updateTodoItem={props.updateTodoItem}
      deleteTodoItem={props.deleteTodoItem}
      deleteTodo={props.deleteTodo}
    />,
  );
  it('Invoke addTodoItem', () => {
    const Form = wrapper.find('[data-qa="todo-form"]');
    expect(Form.length).toEqual(1);
    Form.simulate('submit', {
      preventDefault: () => {
      },
    });
    expect(props.addTodoItem).toHaveBeenCalledTimes(1);
  });
  it('Invoke deleteTodoItem', () => {
    const TodoItemComponents = wrapper.find(TodoItem);
    expect(TodoItemComponents.length).not.toEqual(0);
    TodoItemComponents.first().props().deleteItem('test-todo-item');
    expect(props.deleteTodoItem).toHaveBeenCalledTimes(1);
  });
  it('Invoke deleteTodo', () => {
    const DeleteBtn = wrapper.find('[data-qa="delete-todo-btn"]');
    expect(DeleteBtn.length).toEqual(1);
    DeleteBtn.simulate('click');
    expect(props.deleteTodo).toHaveBeenCalledTimes(1);
  });
  it('Add item input onChange:', () => {
    const MockInputChange = jest.fn();
    const AddTodoInput = wrapper.find('[data-qa="add-todo-input"]');
    expect(AddTodoInput.length).toEqual(1);
    AddTodoInput.simulate('change', {
      target: { value: MockInputChange },
    });
    expect(MockInputChange).toHaveBeenCalledTimes(1);
  });
});
