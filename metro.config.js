const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    extraNodeModules: {
      '@app/blueprints': path.resolve(__dirname, 'blueprints'),
      '@src': path.resolve(__dirname, 'src'),
      '@src/assets': path.resolve(__dirname, 'src/assets'),
      '@src/components': path.resolve(__dirname, 'src/components'),
      '@src/constants': path.resolve(__dirname, 'src/constants'),
      '@src/context': path.resolve(__dirname, 'src/context'),
      '@src/hooks': path.resolve(__dirname, 'src/hooks'),
      '@src/i18n': path.resolve(__dirname, 'src/i18n'),
      '@src/navigation': path.resolve(__dirname, 'src/navigation'),
      '@src/screens': path.resolve(__dirname, 'src/screens'),
      '@src/services': path.resolve(__dirname, 'src/services'),
      '@src/store': path.resolve(__dirname, 'src/store'),
      '@src/utils': path.resolve(__dirname, 'src/utils'),
    },
    sourceExts: [...sourceExts, 'svg'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  watchFolders: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'blueprints'),
  ],
};

module.exports = mergeConfig(defaultConfig, config);
