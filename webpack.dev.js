import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { merge } from 'webpack-merge'

import common from './webpack.common.js'

export default merge(common, {
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    devServer: {
        static: './dist',
        hot: true,
        historyApiFallback: true,
        port: '8080',
        client: {
            overlay: true,
        },
    },
    plugins: [new BundleAnalyzerPlugin({ openAnalyzer: false })],
})
