const WebpackObfuscator = require("webpack-obfuscator");
const glob = require("glob");

const getProuctionConfig = (config) => ({
  ...config,

  optimization: {
    ...config.optimization,
    splitChunks: {
      cacheGroups: {
        extends: {
          test: /\.hidden\.ts$/,
          name: "extends",
          chunks: "all",
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    ...config.plugins,
    new WebpackObfuscator(
      {
        compact: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        splitStrings: true,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayWrappersType: 'function',
        stringArrayWrappersCount: 5,
        stringArrayWrappersChainedCalls: true,    
        stringArrayWrappersParametersMaxCount: 5,
        transformObjectKeys: true,
      },
      ["static/js/vendors.*.js", "static/js/main.*.js"]
    ),
  ],
});

module.exports = function override(config, env) {
  return env === "production" ? getProuctionConfig(config) : config;
};
