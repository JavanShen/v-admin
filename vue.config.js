const path = require('path');
const resolve = (dir) => {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-element-admin/' : '/',
    lintOnSave: false,
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/IconSvg'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/IconSvg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config.module
            .rule('compile')
            .test(/\.js$/)
            .include
            .add(resolve('node_modules/element-ui/packages'))
            .add(resolve('node_modules/element-ui/src'))
            .end()
            .exclude
            .add(resolve('node_modules/element-ui/src/utils/date.js'))
            .end()
            .use('babel')
            .loader('babel-loader')
    }
}