import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
]

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin())
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: 'development',
    plugins,
    entry: ['./src/index.scss', './src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
    },
    devServer: {
        static: './dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            { test: /\.(html)$/, use: ['html-loader'] },
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
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}
