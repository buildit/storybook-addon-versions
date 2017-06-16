import generateLink from '../generateLink';

const location = {
  protocol: 'https:',
  pathname: '/abc/0.1.2/',
  search: '?search_field',
  hash: 'hash_field',
};

test('Generates # link when no args (none)', () => {
  expect(generateLink()).toBe('#');
});

test('Generates # link when no args (location)', () => {
  expect(generateLink(location)).toBe('#');
});

test('Generates # link when no args (location, current)', () => {
  expect(generateLink(location, 'current')).toBe('#');
});

test('Generates # link when no args (location, current, target)', () => {
  expect(generateLink(location, 'current', 'target')).toBe('#');
});

test('Generates correct links (location, "", target, hostname)', () => {
  expect(generateLink(location, '', '1.2.3', 'jest_hostname'))
    .toBe('https://jest_hostname/1.2.3/?search_fieldhash_field');
});

test('Generates correct links (all)', () => {
  expect(generateLink(location, '0.1.2', '1.2.3', 'jest_hostname'))
    .toBe('https://jest_hostname/abc/1.2.3/?search_fieldhash_field');
});
