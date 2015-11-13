/* eslint-env mocha */

require('chai').should();
var xForwardedFromHapi = require('../');

describe('xForwardedFromHapi', function () {
  it('prefixes existing forwarding headers', function () {
    var out = xForwardedFromHapi({
      headers: {
        'x-forwarded-for': 'for',
        'x-forwarded-port': 'port',
        'x-forwarded-proto': 'proto',
      },
      info: {
        remoteAddress: 'for2',
        remotePort: 'port2',
      },
      server: {
        info: {
          protocol: 'proto2',
        },
      },
    });

    out.should.eql({
      'x-forwarded-for': 'for,for2',
      'x-forwarded-port': 'port,port2',
      'x-forwarded-proto': 'proto,proto2',
    });
  });

  it('responds with an empty object when there are no remoteAddress or remotePort', function () {
    var out = xForwardedFromHapi({ info: {} });
    out.should.eql({});
  });
});
