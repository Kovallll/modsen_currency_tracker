import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin, {
    loader as _loader,
} from 'mini-css-extract-plugin'
import { resolve as _resolve } from 'path'

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
]

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin())
}

export default {
    plugins,
    entry: './src/index.jsx',
    output: {
        path: _resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ['html-loader'] },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [_loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
}
