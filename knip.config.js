module.exports = {
  ignoreDependencies: [
    '@commitlint/config-conventional',
    '@zitadel/next-auth',
    'globals',
  ],
  entry: ['src/app/**/*', 'src/components/**/*', 'src/lib/**/*'],
  ignore: ['commitlint.config.js'],
};
