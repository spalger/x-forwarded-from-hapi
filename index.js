module.exports = function (req) {
  var haveAddress = !!req.info.remoteAddress;
  var havePort = !!req.info.remotePort;

  if (!haveAddress || !havePort) return {};

  var forwardedFor = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] + ',' : '';
  var forwardedPort = req.headers['x-forwarded-port'] ? req.headers['x-forwarded-port'] + ',' : '';
  var forwardedProto = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] + ',' : '';

  return {
    'x-forwarded-for': forwardedFor + req.info.remoteAddress,
    'x-forwarded-port': forwardedPort + req.info.remotePort,
    'x-forwarded-proto': forwardedProto + req.server.info.protocol
  };
}
