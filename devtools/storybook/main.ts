// import webpack from './webpack'

module.exports = {
  stories: ['../../packages/**/_stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  // webpackFinal: async (defaultConfig) => {
  //   return webpack(defaultConfig)
  // },
}