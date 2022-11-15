# Development notes

This documentation is developed using vitepress.

The toggler controller is used in the documentation, so we develop it testing directly in this same documentation.

## Building docs in development

```bash
npm run docs:dev
```

## Building docs in production

This is handled by a github action (`.github\workflows\nuild-docs.yml`) so it is not needed during development or deployment.

If you want to do it manually, you can run:

```bash
npm run docs:build
```