# ezp

Easy Proxy for fluent APIs.

# Use

```js
const ezp = require('ezp');

const P = ezp({
    get: function(props) {
        // Called by:
        //      P.foo.bar.baz.$
        // props:
        //      ['foo', 'bar', 'baz']
    },
    set: function(props, value) {
        // Called by:
        //      P.foo.bar.baz = 1337
        // props:
        //      ['foo', 'bar', 'baz']
        // value:
        //      1337
    },
    delete: function(props) {
        // Called by:
        //      delete P.foo.bar.baz;
        // props:
        //      ['foo', 'bar', 'baz']
    },
    has: function(props) {
        // Called by:
        //      'qux' in P.foo.bar.baz
        // props:
        //      ['foo', 'bar', 'baz']
        // value:
        //      'qux'
    },
    apply: function(props, args) {
        // Called by:
        //      P.foo.bar.baz(1337, 'qux')
        // props:
        //      ['foo', 'bar', 'baz']
        // args:
        //      [1337, 'qux']
    },
}, '$');
```

`ezp` receives a handler object and an optional escape property, and returns a fluent proxy.

The handler object supports the following fluent traps: `get`, `set`, `delete`, `in` and `apply`, which are triggered as illustrated in the example above.

Note that to use the `get` trap, an escape property must be provided. This value will then be *magical*, and be used to trigger the `get` trap instead of navigating one level deeper within the proxy itself.

**NOTE:** The proxy is created as a *virtual object*, and interacting with the underlying target without setting the appropriate traps may result in unspecified behaviour. Use only the proxy in ways which are handled by the traps provided.

# Install
with [npm](https://npmjs.org) do:

```sh
npm install ezp
```

# License

MIT
