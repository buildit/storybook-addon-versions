import React from 'react';
import { configure } from '@storybook/react';

// Now go through all the stories in the src tree
function requireAll(context) {
    return context.keys().map(context)
}

function loadStories() {
  requireAll(require.context('../example/', true, /.+\/story.js$/));
}

configure(loadStories, module);
