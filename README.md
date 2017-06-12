# storybook-addon-versions

This addon attempts to get a list of available style guide versions from the root of your host. If they are found it will show a dropdown which then lets you navigate to the various versions, as such allowing users to see how a component may have changed over different versions.

Currently the versions are expected to be in a file `storybook-config.json` at the root of your host. You can mock this adding a `storybook-config.json` in your local `.storybook/` folder. Here's some sample content:

```
{
  "storybook": {
    "versions": [
      "0_0_1",
      "0_0_2",
      "0.2.13",
      "0.3.4"
    ],
    "regex": "\/([^\/]+?)\/?$"
  }
}
```

The `versions` field is just an array of the different available versions. The `regex` field is for a regular expression that will extract the version number for your URL. This is dependant on the way you store the static storybook builds. The example above will work for the format `http://localhost:port/<version>/` so for example, version `0.1.2` would be expected to be found like this `http://mystorybook/0.1.2/`.

The config format is the same as for [blabbr](https://github.com/buildit/storybook-addon-blabbr).
