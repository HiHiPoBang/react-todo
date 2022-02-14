import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TodoItem from '../components/Todo/TodoItem';

describe('Event', () => {
  const mockProp = {
    id: 'test-item',
    label: 'test-label',
    type: 'default',
  };
  const props = {
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };
  const wrapper = shallow(
    <TodoItem
      item={mockProp}
      updateItem={props.updateItem}
      deleteItem={props.deleteItem}
    />,
  );

  it('Delete item', () => {
    const DeleteBtn = wrapper.find('[data-qa="delete-item-btn"]');
    expect(DeleteBtn.length).toEqual(1);
    DeleteBtn.simulate('click');
    expect(props.deleteItem).toBeCalledTimes(1);
  });
});
