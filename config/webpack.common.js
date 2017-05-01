const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {
    entry: {
      'index': './src/index.js',
    },

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd',
        library: 'Servable',
        umdNamedDefine: true,
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['*', '.js'],
        modules: [helpers.root('node_modules')],
    },
    resolveLoader: {
        modules: [helpers.root('node_modules')]
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {modules: false, loose: true}], 'stage-0'],
                    }
                },
                include: helpers.root('src')
            },
        ]
    },
};
