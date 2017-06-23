import React from 'react';
import addons from '@storybook/addons';
import Panel from './panel';

addons.register('buildit/versions', (api) => {
  const channel = addons.getChannel();

  addons.addPanel('buildit/versions', {
    title: 'versions',
    render: () => (
      <Panel
        channel={channel}
        storybook={api}
        key="versions-panel"
        location={window.parent.location}
      />
    ),
  });
});
