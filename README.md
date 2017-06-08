# storybook-addon-versions

It  will attempt to get a list of versions available from the root of the host. It looks for
a file `versions.json` and expects to find an array with the versions listed. You can mock this using the provided
`versions.json` in `.storybook/`. This is used to populate the navigation section at the top of the story panel.
