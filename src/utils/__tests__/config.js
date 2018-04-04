import getConfig from '../config';

const file1 = {
  storybook: {
    versions: {
      availableVersions: [
        '0.1',
        '0.2',
        '0.3',
      ],
    },
  },
};

const file2 = {
  storybook: {
    versions: {
      availableVersions: [
        '0.2.4',
        '0.2.5',
        '0.2.6',
        '0.3.0',
      ],
    },
  },
};

const invalid = {
  foo: 'bar',
};

describe('Config', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((location) => {
      let p;
      if (location.search('storybook-config.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => new Promise(res => res(file1)),
          });
        });
      } else if (location.search('filename.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => new Promise(res => res(file2)),
          });
        });
      } else if (location.search('invalid.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => new Promise(res => res(invalid)),
          });
        });
      } else if (location.search('response_not_ok.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: false,
            json: () => new Promise(res => res(invalid)),
          });
        });
      } else if (location.search('blank/version_response_not_ok_but_root_is.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: false,
            json: () => new Promise(res => res(invalid)),
          });
        });
      } else if (location.search('version_response_not_ok_but_root_is.json') !== -1) {
        p = new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => new Promise(res => res(file1)),
          });
        });
      } else {
        p = new Promise((resolve, reject) => reject());
      }
      return p;
    });
  });
  afterAll(() => {
    global.fetch.mockRestore();
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Get the default config if no filename supplied', async () => {
    expect.assertions(1);
    await expect(getConfig()).resolves.toEqual(file1.storybook.versions);
  });

  it('Get the specified config when a filename is supplied', async () => {
    expect.assertions(1);
    await expect(getConfig('filename.json')).resolves.toEqual(file2.storybook.versions);
  });

  it('Throws an error when the config is inavlid', async () => {
    expect.assertions(1);
    await expect(getConfig('invalid.json')).rejects.toEqual('Invalid config');
  });

  it('Throws an error when the response is not ok', async () => {
    expect.assertions(1);
    await expect(getConfig('response_not_ok.json')).rejects.toEqual('Error getting config');
  });

  it('Get the root config when a filename does not exist in one of the versions', async () => {
    expect.assertions(4);
    await expect(getConfig('version_response_not_ok_but_root_is.json')).resolves.toEqual(file1.storybook.versions);

    const mockCalls = global.fetch.mock.calls;

    expect(mockCalls).toHaveLength(2);
    expect(mockCalls[0][0]).toEqual('about://:/blank/version_response_not_ok_but_root_is.json');
    expect(mockCalls[1][0]).toEqual('about://:/version_response_not_ok_but_root_is.json');
  });

  it('Throw an error when an invalid file is requested', async () => {
    expect.assertions(1);
    await expect(getConfig('error.json')).rejects.toEqual('Error getting config');
  });

  it('Caches the results if the same file is requested', async () => {
    expect.assertions(4);
    const initVal = fetch.mock.calls.length;
    await expect(getConfig('filename.json')).resolves.toEqual(file2.storybook.versions);
    expect(fetch.mock.calls.length).toBe(1 + initVal);
    await expect(getConfig('filename.json')).resolves.toEqual(file2.storybook.versions);
    expect(fetch.mock.calls.length).toBe(1 + initVal);
  });
});
