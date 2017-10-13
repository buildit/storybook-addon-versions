let configFile = null;
let lastFilename = null;

const getConfig = (filename = 'storybook-config.json') => (
  new Promise((resolve, reject) => {
    if (lastFilename === filename && configFile) {
      resolve(configFile);
    } else if (window && window.parent) {
      lastFilename = filename;
      const url = window.parent.location;
      const origin = `${url.protocol}//${url.hostname}:${url.port}`;

      const fetchConfig = pathParts => fetch(`${origin}/${pathParts.join('/')}${filename}`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data && data.storybook && data.storybook.versions) {
              configFile = data.storybook.versions;
              resolve(configFile);
            } else {
              reject('Invalid config');
            }
          });
        } else {
          reject('Response not ok');
        }
      }).catch(() => {
        if (pathParts.filter(_ => _).length === 0) {
          throw new Error('Error getting config');
        }

        return fetchConfig(pathParts.slice(0, pathParts.length - 2).concat(['']));
      });

      fetchConfig(url.pathname.split('/').filter(_ => _).concat([''])).catch((e) => {
        reject(e.message);
      });
    } else {
      reject('Window not found');
    }
  })
);

export default getConfig;
