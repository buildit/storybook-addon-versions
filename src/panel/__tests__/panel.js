import React from 'react';
import renderer from 'react-test-renderer';
import Panel from '../';

jest.mock('../../utils/config');

test('Panel renders correctly, dev false', () => {
  const storybook = {
    getQueryParam: () => 'false',
    setQueryParams: () => {},
  };

  const tree = renderer
    .create(<Panel storybook={storybook} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Panel renders correctly, dev true', () => {
  const storybook = {
    getQueryParam: () => 'true',
    setQueryParams: () => {},
  };

  const tree = renderer
    .create(<Panel storybook={storybook} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
