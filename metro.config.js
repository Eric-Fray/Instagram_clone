const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const exclusionList = require('metro-config/src/defaults/exclusionList');
module.exports = {
    resolver: {
      blockList: exclusionList([/amplify\/#current-cloud-backend\/.*/]),
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };

//module.exports = mergeConfig(getDefaultConfig(__dirname), config);
