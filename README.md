# storybook-addon-versions

It  will attempt to get a list of versions available from the root of the host. It looks for
a file `versions.json` and expects to find an array with the versions listed. You can mock this adding a `versions.json` in your local `.storybook/` folder. Here's some sample content:

```
[
  "0_0_1",
  "0_0_2",
  "0.2.13",
  "0.3.4"
]
```
