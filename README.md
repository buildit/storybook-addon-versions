# storybook-addon-versions

This addon attempts to get a list of available style guide versions from the root of your host. If they are found it will show a dropdown which then lets you navigate to the various versions, as such allowing users to see how a component may have changed over different versions.

## Storybook registration

To use the plugin you just need to add a decorator. Add the following to your `config.js` in the storybook configuration:

```
import { withVersions } from '@buildit/storybook-addon-blabbr';

addDecorator(withVersions);
```

## Configuration

This addon expects to find a `storybook-config.json` configuration file at the root of your host, for static builds, or inside your storybook setup folder (generally `.storybook`). This should look like this:

```
{
  "storybook": {
    "versions": {
      "versionsPath": "storybook-versions.json",
      "urlRegex": ""
    }
  }
}
```

`versionsPath` should point to a file in your host which will have a list of all available versions like this:

```
[
  "0_0_1",
  "0_0_2",
  "0.2.13",
  "0.3.4"
]
```

`urlRegex` will be used to determine where the version is in your URL.

*TODO*: Add some sample regex here for common patterns...
