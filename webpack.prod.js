import TerserPlugin from 'terser-webpack-plugin'
import { merge } from 'webpack-merge'

import common from './webpack.common.js'

export default merge(common, {
    mode: 'production',
    target: 'browserslist',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
})
