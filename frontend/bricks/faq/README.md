# Brick: FAQ

Use this brick in combination with the `CMFAQ` content type to support FAQ rendering.

## Installation
Add the path to this brick to the `packages` section in your `<blueprint-workspace-root>/frontend/pnpm-workspace.yaml`:

**pnpm-workspace.yaml**
```yaml
packages:
  ...
  - "../modules/extensions/faq/frontend/bricks/faq"
```

Afterwards you can add a dependency to the brick in your theme `package.json`.

**my-theme/package.json**
```json
{
  "name": "@coremedia-examples/my-theme",
  ...
  "dependencies": {
    ...
    "@coremedia/brick-faq": "^1.0.0",
    ..
  },
  ...
}
```
