# storybook-addon-versions

This addon attempts to get a list of available style guide versions from the root of your host. If they are found it will show a dropdown which then lets you navigate to the various versions, as such allowing users to see how a component may have changed over different versions.

Currently the versions are expected to be in a file `storybook-versions.json`, listed as an array and at the root of your host. You can mock this adding a `storybook-versions.json` in your local `.storybook/` folder. Here's some sample content:

```
[
  "0_0_1",
  "0_0_2",
  "0.2.13",
  "0.3.4"
]
```
