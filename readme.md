# vue-cli-plugin-ionic

A [Vue CLI 3 Plugin](https://github.com/vuejs/vue-cli) for installing [Ionic](https://github.com/ionic-team/ionic-framework/tree/master/packages/vue).

## Installing

```bash
vue add @tommyo/ionic
```

## Note about Router

If [@vue/cli-plugin-router](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router) is installed then [@ionic/vue-router](https://github.com/ionic-team/ionic-framework/tree/master/packages/vue-router) is automatically installed and an attempt to update the router config is made. If you'd like to use `@ionic/vue-router`, be sure to add the `@vue/router` plugin first.

## TODO

- [ ] Add `ionic init` step
- [ ] Allow option to generate initial templates