# Pubishing

## Setup to publish in NPM

In command line:

```bash
npm adduser
```

## Publish in NPM

In command line:

```bash
npm version x.y.z
npm version [major | minor | patch]
npm version x.y.z --no-git-tag-version # use this if release is created in github first
```

For example, to release a patch version:

```bash
npm version patch -m "(dev): tag %s"
npm publish --access public
```

These commands will create a tag in git, so push to repo after them.

Also, create a release in the repo after all.

## Deprecate package

In command line:

```bash
npm deprecate <package-name>@<version> "<message>"
```
