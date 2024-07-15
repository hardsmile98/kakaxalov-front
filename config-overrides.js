var WebpackObfuscator = require('webpack-obfuscator');

module.exports = function override(config, env) {
    console.log(config);
    
    return {
        ...config,
        plugins: [
            ...config.plugins,
            new WebpackObfuscator ({
                rotateStringArray: true
            })
        ]
    };
}