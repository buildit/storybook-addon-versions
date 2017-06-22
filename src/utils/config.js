let configFile = null;

const getConfig = (filename = 'storybook-config.json') => (
  new Promise((resolve, reject) => {
    if (configFile) {
      resolve(configFile);
    } else if (window && window.parent) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/${filename}`;

      fetch(location).then((response) => {
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
        reject('Error getting config');
      });
    } else {
      reject('Window not found');
    }
  })
);

export default getConfig;
