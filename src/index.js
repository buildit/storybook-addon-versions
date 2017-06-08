import React from 'react';
import addons from '@kadira/storybook-addons'; // eslint-disable-line
import Versions from './versions';

function wrapStory(channel, storyFn, context) {
  return (
    <div>
      <Versions availableVersions='' currentVersion="0.0.0" />
      {storyFn(context)}
    </div>
  );
}

export function withVersions(storyFn, context) {
  const channel = addons.getChannel();
  return wrapStory(channel, storyFn, context);
}
