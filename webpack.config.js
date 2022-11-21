//set module.exports to be object that hold all necessary config for webpack to properly access into bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    //added source-map
    //set the mode to be production
    //will create minified/uglified production bundle
    mode: process.env.NODE_ENV, //does this need to be single quotes?
    devtool: 'source-map',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Development',
        template: './client/index.html'
        })
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
      },
    devServer: {
        host: 'localhost',
        port: 8080,
        allowedHosts: 'all',
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, 'build'),
          publicPath: '/'
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
      },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }, {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }


};