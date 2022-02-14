import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import TodoView from '../views/TodoView';

describe('Render', () => {
  const wrapper = shallow(<App />);
  test('App ', () => {
    expect(wrapper.find('[data-qa="App"]').length).toEqual(1);
  });
  test('SubComponents ', () => {
    expect(wrapper.find('[data-qa="App_todoView"]').length).toEqual(1);
  });
});
