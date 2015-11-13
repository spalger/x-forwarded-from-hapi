# x-forwarded-from-hapi

A simple module that mimics the way that [h2o2](https://github.com/hapijs/h2o2) sets x-forwarded headers, for when you need to implement your own pseduo-proxy route but want to be a good forwarding citizen.

## Usage
```js
import xForwardedFromHapi from 'x-forwarded-from-hapi';

//...

server.route({
  path: '/proxy',
  handler(req, reply) {
    //...
    Wreck.request('GET', 'http://target.server/someUri', {
      payload: req.payload,
      headers: {
        ...req.headers,
        ...xForwardedFromHapi(req),
      }
    }, reply);
  },
});
```
