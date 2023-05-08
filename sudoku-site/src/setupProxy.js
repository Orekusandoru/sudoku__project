const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://example.com', // Replace with the URL of your backend server
      changeOrigin: true,
    })
  );
};
