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

describe('API', () => {
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
      } else {
        p = new Promise((resolve, reject) => reject());
      }
      return p;
    });
  });
  afterAll(() => {
    global.fetch.mockRestore();
  });

  it('Get the default config if no filename supplied', async () => {
    expect.assertions(1);
    await expect(getConfig()).resolves.toEqual(file1.storybook.versions);
  });

  xit('Get the specified config when a filename is supplied', async () => {
    expect.assertions(1);
    await expect(getConfig('filename.json')).resolves.toEqual(file2.storybook.versions);
  });

  xit('Throw an error when an invalid file is requested', async () => {
    expect.assertions(1);
    await expect(getConfig('error.json')).rejects.toEqual('Error getting config');
  });
});
