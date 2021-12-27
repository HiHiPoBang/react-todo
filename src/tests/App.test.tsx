import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';
import TodoView from '../views/TodoView';

test('ShallowMount App ', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
  expect(result.props.children).toEqual(<TodoView />);
});
