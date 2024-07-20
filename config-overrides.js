const WebpackObfuscator = require("webpack-obfuscator");

const getProuctionConfig = (config) => ({
  ...config,
  optimization: {
    ...config.optimization,
    splitChunks: {
      cacheGroups: {
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
        rotateStringArray: true,
      },
      ["static/js/vendors.*.js"]
    ),
  ],
});

module.exports = function override(config, env) {
  return env === "production" ? getProuctionConfig(config) : config;
};
