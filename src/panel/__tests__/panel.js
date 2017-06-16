import React from 'react';
import renderer from 'react-test-renderer';
import Panel from '../';

jest.mock('../../utils/config');

const storybook = {
  getQueryParam: () => 'false',
  setQueryParams: () => {},
};
const storybook2 = {
  getQueryParam: () => 'true',
  setQueryParams: () => {},
};

test('Panel renders correctly, dev false', () => {
  const tree = renderer
    .create(<Panel storybook={storybook} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Panel renders correctly, dev true', () => {
  const tree = renderer
    .create(<Panel storybook={storybook2} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
