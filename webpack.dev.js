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
    },
})
