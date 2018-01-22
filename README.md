# http-response-class

Simple http response wrapper.

`npm install http-response-class --save`

Usage:

```
'use strict';

const Response = require( 'http-response-class' );

console.log( new Response( 200, 'pong', 'main process', metadata );
```

Parameters:

- `statusCode`
- `message`
- `origin` of the response
- (optional) `metadata`


```
100: 'Continue'
101: 'Switching Protocols'
102: 'Processing'
110: 'Response is Stale'
111: 'Revalidation Failed'
112: 'Disconnected Operation'
113: 'Heuristic Expiration'
199: 'Miscellaneous Warning'

200: 'OK'
201: 'Created'
202: 'Accepted'
203: 'Non-Authoritative Information'
204: 'No Content'
205: 'Reset Content'
206: 'Partial Content'
207: 'Multi-Status'
208: 'Already Reported'
214: 'Transformation Applied'
226: 'IM Used'
299: 'Miscellaneous Persistent Warning'

300: 'Multiple Choices'
301: 'Moved Permanently'
302: 'Found'
303: 'See Other'
304: 'Not Modified'
305: 'Use Proxy'
307: 'Temporary Redirect'
308: 'Permanent Redirect'

400: 'Bad Request'
401: 'Unauthorized'
402: 'Payment Required'
403: 'Forbidden'
404: 'Not Found'
405: 'Method Not Allowed'
406: 'Not Acceptable'
407: 'Proxy Authentication Required'
408: 'Request Timeout'
409: 'Conflict'
410: 'Gone'
411: 'Length Required'
412: 'Precondition Failed'
413: 'Payload Too Large'
414: 'URI Too Long'
415: 'Unsupported Media Type'
416: 'Range Not Satisfiable'
417: 'Expectation Failed'
418: 'I\'m a teapot'
421: 'Misdirected Request'
422: 'Unprocessable Entity'
423: 'Locked'
424: 'Failed Dependency'
425: 'Unordered Collection'
426: 'Upgrade Required'
428: 'Precondition Required'
429: 'Too Many Requests'
431: 'Request Header Fields Too Large'
451: 'Unavailable For Legal Reasons'

500: 'Internal Server Error'
501: 'Not Implemented'
502: 'Bad Gateway'
503: 'Service Unavailable'
504: 'Gateway Timeout'
505: 'HTTP Version Not Supported'
506: 'Variant Also Negotiates'
507: 'Insufficient Storage'
508: 'Loop Detected'
509: 'Bandwidth Limit Exceeded'
510: 'Not Extended'
511: 'Network Authentication Required'
```

CHANGELOG:

- v1.2.2
    - Added `getMessageForCode`
    - Exposed `isInformational`, `isSuccess`, `isRedirection`, `isClientError`, `isServerError`, `isWarning`, and `isHTTPCode` as static functions
    - Exposed `codes` as statically accessible value

- v1.1.5
    - Added support for [103 - RFC8297 Section 2](https://tools.ietf.org/html/rfc8297#section-2)
    - Added legacy support for [306 - RFC7231 Section 6.4.6](https://tools.ietf.org/html/rfc7231#section-6.4.6) for old ASP.NET platforms

- v1.1.4
    - Added RFC7234 Warning codes:
        - [110 - RFC7234 Section 5.5.1](https://tools.ietf.org/html/rfc7234#section-5.5.1)
        - [111 - RFC7234 Section 5.5.2](https://tools.ietf.org/html/rfc7234#section-5.5.2)
        - [112 - RFC7234 Section 5.5.3](https://tools.ietf.org/html/rfc7234#section-5.5.3)
        - [113 - RFC7234 Section 5.5.4](https://tools.ietf.org/html/rfc7234#section-5.5.4)
        - [199 - RFC7234 Section 5.5.5](https://tools.ietf.org/html/rfc7234#section-5.5.5)
        - [214 - RFC7234 Section 5.5.6](https://tools.ietf.org/html/rfc7234#section-5.5.6)
        - [299 - RFC7234 Section 5.5.7](https://tools.ietf.org/html/rfc7234#section-5.5.7)
- v1.1.3/2
    - Added response codes to documentation
- v1.1.1
    - added postversion command
    - edit `setStatusCode`
- v1.1.0
    - Added `getCodeFromMessage`
    - Added `setStatusCode`
    - Added `setMessage`
    - Added `setClassification`
    - Added tests
    - Edited constructor
- v1.0.3, v1.0.5, v1.0.6, v1.0.7
    - `.git`, `.npm` issues
- v1.0.4
    - patch edits adding `Symbol` for fine grain handling
- v1.0.2
    - fixed `instanceof`
- v1.0.1
    - fixed potential cyclic `Response`
- v1.0.0
    - Added tests and fixed metadata fill in
