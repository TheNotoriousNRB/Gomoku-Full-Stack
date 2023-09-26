const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REAT_APP_PROXY_HOST || 'http://localhost:9999',
            changeOrigin: true,
        })
    )
}