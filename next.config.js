const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  'src': __dirname + '/src',
  '#': __dirname,
  'api': __dirname + '/src/pages/api',
})

module.exports = {
  webpack: (config, options) => {
    return config
  }
}

module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
}
