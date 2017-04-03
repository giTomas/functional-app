import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/app';

describe('app', () => {
  it('renders', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
