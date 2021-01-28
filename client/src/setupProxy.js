const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/socket.io"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
