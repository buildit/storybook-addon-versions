# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Configuration

You can configure blabbr by running the configure script. After installation you should see a message with the command to start the configuration script. You can either copy sample files into your local storybook configuration folder and then edit them _or_ you can create the configuration via an interactive session. To start the script just run:

```
node node_modules/.bin/blabbr-config
```

## Storybook registration

To use the plugin you need to register the plugin and add a decorator, like most Storybook plugins.

First add the following to your `addons.js` file in the storybook configuration:

`import '@buildit/storybook-addon-blabbr/register';`

Then configure the decorator. Add the following to your `config.js` in the storybook configuration:

```
import { withComments } from '@buildit/storybook-addon-blabbr';

addDecorator(withComments);
```

## Comment formatting

There is currently no formatting available in the comments section. However, the editor does two things:

1. Retains multi-line format
2. Parses hyperlinks. So if you type `http://www.yoururl.com` in the box this will be shown as a link.

## Versioning support

If you configured blabbr to support versions, on startup, it  will attempt to get a list of versions available from the root of the host. It looks for
a file `versions.json` and expects to find an array with the versions listed. You can mock this using the provided
`versions.json` in `.storybook/`. This is used to populate the navigation section at the top of the story panel.
