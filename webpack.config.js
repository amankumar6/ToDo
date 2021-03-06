const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// javaScript rule that specifies what to do with .js files
const javascript = {
    test: /\.(js)$/,
    use: [
        {
            loader: 'babel-loader',
            options: { presets: ['env'] },
        },
    ],
};

// postCSS loader which gets fed into the next loader. I'm setting it up in it's own variable because its a didgeridog

const postcss = {
    loader: 'postcss-loader',
    options: {
        plugins() {
            return [autoprefixer({ browsers: 'last 3 versions' })];
        },
    },
};

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
    test: /\.(scss)$/,
    // here we pass the options as query params b/c it's short.
    use: ExtractTextPlugin.extract([
        'css-loader?sourceMap',
        postcss,
        'sass-loader?sourceMap',
    ]),
};

// compress the crap out of our JS
const uglify = new webpack.optimize.UglifyJsPlugin({
    // eslint-disable-line
    compress: { warnings: false },
});

const config = {
    entry: {
        // we only have 1 entry, but I've set it up for multiple in the future
        App: './public/javascripts/main.js',
    },
    // we're using sourcemaps and here is where we specify which kind of sourcemap to use
    devtool: 'source-map',
    // Once things are done, we kick it out to a file.
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].bundle.js',
    },

    // passing it the rules for our JS and our styles
    module: {
        rules: [javascript, styles],
    },
    // finally we pass it an array of our plugins
    // plugins: [uglify]
    plugins: [
        // here is where we tell it to output our css to a separate file
        new ExtractTextPlugin('style.css'),
    ],
};

process.noDeprecation = true;

module.exports = config;
