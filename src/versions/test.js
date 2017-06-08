import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Versions from './';

test('Versions dropdown not shown when no versions required (null)', () => {
  const tree = renderer.create(
    <Versions />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (empty)', () => {
  const tree = renderer.create(
    <Versions versions={[]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown shows the supplied versions', () => {
  const tree = renderer.create(
    <Versions versions={[
      '0.0.1',
      '0.0.2',
      '0.0.3',
    ]}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

