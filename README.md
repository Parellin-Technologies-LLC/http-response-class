# http-response-class

Simple http response wrapper.

`npm install http-response-class --save`

Usage:

```
'use strict';

const Response = require( 'http-response-class' );

console.log( new Response( 200, 'pong', 'main process' );
```

Parameters:

- `statusCode`
- `message`
- `origin` of the response
