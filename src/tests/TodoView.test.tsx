import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TodoView from '../views/TodoView';
import Todo from '../components/Todo/Todo';

const wrapper = shallow(<TodoView />);
describe('Rendered & snapshot', () => {
  it('TodoView ', () => {
    expect(wrapper.find('[data-qa="todo-view"]').length).toEqual(1);
  });
  it('Create snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
describe('addNewTodo', () => {
  it('the number of todo: 1 -> 2', () => {
    const addBtn = wrapper.find('[data-qa="add-todo-btn"]');
    expect(addBtn.length).toEqual(1);
    expect(wrapper.find(Todo).length).toEqual(1);
    addBtn.simulate('click');
    expect(wrapper.find(Todo).length).toEqual(2);
  });
});
describe('Todo', () => {
  const TodoComponents = wrapper.find(Todo);
  it('child component: Todo', () => {
    expect(TodoComponents.length).toEqual(1);
  });
  it('addTodoItem', () => {
    TodoComponents.first().props().addTodoItem({});
    expect(wrapper.find(Todo).first().props().todo.length).toEqual(3);
  });
  it('deleteTodoItem', () => {
    const { todo, todoId } = TodoComponents.first().props();
    const newItem = todo[todo.length - 1];
    TodoComponents.first().props().deleteTodoItem({ todoId, id: newItem.id });
    expect(wrapper.find(Todo).first().props().todo.length).toEqual(1);
  });
  it('deleteTodoItem: throw error', () => {
    try {
      TodoComponents.first().props().deleteTodoItem({ todoId: 'test', id: 'test' });
    } catch (e: any) {
      expect(e.message).toBe('Warning: item is not existed');
    }
  });
  it('deleteTodo', () => {
    TodoComponents.first().props().deleteTodo();
    expect(wrapper.find(Todo).length).toEqual(0);
  });
});
