import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  ...nextConfig,
  ...nextTypescript,
  prettierConfig,
];
