# Inline script

that inline.js put into index.html directly, should not use any import or export

1. run `yarn buildIndex18n` when have update i18n string

# Why

that script must be inline put into html, we need make sure that be smallest size, so we not use any bundle here currently.

if we can find a solution can prevent that file be bigger, we can switch to better way.
