import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';
import 'jest-styled-components';
import TodoView from '../views/TodoView';

describe('Rendered TodoView', () => {
  test('ShallowMount TodoView ', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<TodoView />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    expect(result.props.className).toEqual('TodoView');
  });
  test('Create snapshot', () => {
    const snapshot = create(<TodoView />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
