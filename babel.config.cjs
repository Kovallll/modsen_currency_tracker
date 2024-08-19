const plugins = []
if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel')
}

const config = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins,
}

module.exports = config
