module.exports = {
  ignoreDependencies: ['@commitlint/config-conventional'],
  entry: [
    'src/app/**/*',
    'src/components/**/*',
    'src/lib/**/*',
  ],
  ignore: ['commitlint.config.js'],
};
