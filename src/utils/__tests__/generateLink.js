import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import generateLink from '../generateLink';

global.parent = {
  location: {
    protocol: 'https',
    pathname: '/abc/0.1.2/',
    search: '?search_field',
    hash: 'hash_field',
  },
};

test('generates # link when no args', () => {
  expect(generateLink()).toBe('#');
});
