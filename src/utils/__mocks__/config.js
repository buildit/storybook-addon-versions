const configFile = require('../../../.storybook/storybook-config.json');

const getConfig = () => (
  new Promise((resolve) => {
    resolve(configFile.storybook.versions);
  })
);

export default getConfig;
