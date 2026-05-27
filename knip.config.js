module.exports = {
  ignoreDependencies: [
    '@commitlint/config-conventional',
    'globals'
  ],
  entry: ['src/app/**/*', 'src/components/**/*', 'src/lib/**/*'],
  ignore: ['commitlint.config.js'],
};
