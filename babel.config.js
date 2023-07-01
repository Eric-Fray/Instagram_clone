module.exports = {
  presets: [
    [
    'module:metro-react-native-babel-preset',
    {useTransformReactJSXExperimental: true},
    ],
  ],
  plugins: [
    [
      '@babel/plugins-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
