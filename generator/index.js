module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api);

  const hasRouter = api.hasPlugin('router');
  const isTS = api.hasPlugin('typescript');

  const version = '5.4.0';

  api.extendPackage({
    dependencies: { 
      '@ionic/vue': `^${version}`,
      'ionicons': '^5.2.3'
    }
  });
  api.injectImports(api.entryFile, `import ionic from './plugins/ionic'`);
  api.transformScript(api.entryFile, require('./injectUseIonic'));
  
  api.render('./template');

  if (hasRouter) {
    api.extendPackage({
      dependencies: { '@ionic/vue-router': `^${version}` }
    });
    api.transformScript(`src/router/index.${isTS ? 'ts' : 'js'}`, require('./modifyRouter'));
    api.exitLog('Don\'t forget to replace RouterView with IonRouterOutlet wherever needed');
  }

  api.onCreateComplete(() => {});

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert');
      convertFiles(api);
    }
  }
};
