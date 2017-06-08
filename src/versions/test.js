import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Versions from './';

test('Versions dropdown not shown when no versions required (null)', () => {
  const tree = renderer.create(
    <Versions />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (current empty)', () => {
  const tree = renderer.create(
    <Versions currentVersions="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (current with no available)', () => {
  const tree = renderer.create(
    <Versions currentVersions="0.0.1" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (no current with available)', () => {
  const tree = renderer.create(
    <Versions availableVersions={[
      '0.0.1',
      '0.0.2',
      '0.0.3',
    ]}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (empty current with available)', () => {
  const tree = renderer.create(
    <Versions
      currentVersion=""
      availableVersions={[
        '0.0.1',
        '0.0.2',
        '0.0.3',
      ]}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (no current available empty)', () => {
  const tree = renderer.create(
    <Versions availableVersions={[]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown not shown when no versions required (available empty with current)', () => {
  const tree = renderer.create(
    <Versions currentVersion="0.0.1" availableVersions={[]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Versions dropdown shows the supplied versions', () => {
  const tree = renderer.create(
    <Versions
      currentVersion="0.0.1"
      availableVersions={[
        '0.0.1',
        '0.0.2',
        '0.0.3',
      ]}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

