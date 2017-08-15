'use strict';

class Response
{
    constructor( statusCode, data, origin = null, ...metadata )
    {
        if( typeof statusCode !== 'number' || statusCode !== +statusCode )
            throw 'Argument Error - [statusCode] must be typeof number.';
        else if( !this.isHTTPCode( statusCode ) )
            throw 'Argument Error - [statusCode] must be valid HTTP code';
        else if( this.isInformational( statusCode ) )
            this.classification = 'Informational';
        else if( this.isSuccess( statusCode ) )
            this.classification = 'Success';
        else if( this.isRedirection( statusCode ) )
            this.classification = 'Redirection';
        else if( this.isClientError( statusCode ) )
            this.classification = 'Client Error';
        else if( this.isServerError( statusCode ) )
            this.classification = 'Server Error';
        else
            this.classification = 'Unknown';

        Object.defineProperty( this, 'codes', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: {
                100: 'Continue',
                101: 'Switching Protocols',
                102: 'Processing',
                200: 'OK',
                201: 'Created',
                202: 'Accepted',
                203: 'Non-Authoritative Information',
                204: 'No Content',
                205: 'Reset Content',
                206: 'Partial Content',
                207: 'Multi-Status',
                208: 'Already Reported',
                226: 'IM Used',
                300: 'Multiple Choices',
                301: 'Moved Permanently',
                302: 'Found',
                303: 'See Other',
                304: 'Not Modified',
                305: 'Use Proxy',
                307: 'Temporary Redirect',
                308: 'Permanent Redirect',
                400: 'Bad Request',
                401: 'Unauthorized',
                402: 'Payment Required',
                403: 'Forbidden',
                404: 'Not Found',
                405: 'Method Not Allowed',
                406: 'Not Acceptable',
                407: 'Proxy Authentication Required',
                408: 'Request Timeout',
                409: 'Conflict',
                410: 'Gone',
                411: 'Length Required',
                412: 'Precondition Failed',
                413: 'Payload Too Large',
                414: 'URI Too Long',
                415: 'Unsupported Media Type',
                416: 'Range Not Satisfiable',
                417: 'Expectation Failed',
                418: 'I\'m a teapot',
                421: 'Misdirected Request',
                422: 'Unprocessable Entity',
                423: 'Locked',
                424: 'Failed Dependency',
                425: 'Unordered Collection',
                426: 'Upgrade Required',
                428: 'Precondition Required',
                429: 'Too Many Requests',
                431: 'Request Header Fields Too Large',
                451: 'Unavailable For Legal Reasons',
                500: 'Internal Server Error',
                501: 'Not Implemented',
                502: 'Bad Gateway',
                503: 'Service Unavailable',
                504: 'Gateway Timeout',
                505: 'HTTP Version Not Supported',
                506: 'Variant Also Negotiates',
                507: 'Insufficient Storage',
                508: 'Loop Detected',
                509: 'Bandwidth Limit Exceeded',
                510: 'Not Extended',
                511: 'Network Authentication Required'
            }
        } );

        this.statusCode = statusCode;
        this.data       = data;
        this.message    = this.codes[ statusCode ];
        this.origin     = origin || this.constructor.name;

        if( metadata )
            this.metadata = metadata;
    }

    toString()
    {
        return JSON.stringify( {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        } );
    }

    isInformational( code )
    {
        return /^(10[0-2])$/.test( code || this.statusCode );
    }

    isSuccess( code )
    {
        return /^(20[0-8]|226)$/.test( code || this.statusCode );
    }

    isRedirection( code )
    {
        return /^(30[0-8])$/.test( code || this.statusCode );
    }

    isClientError( code )
    {
        return /^(40[0-9]|41[0-8]|42[1-6,8,9]|431|451)$/.test( code || this.statusCode );
    }

    isServerError( code )
    {
        return /^(50[0-9]|51[0,1])$/.test( code || this.statusCode );
    }

    isHTTPCode( code )
    {
        return /^(10[0-2])|(20[0-8]|226)|(30[0-8])|(40[0-9]|41[0-8]|42[1-6,8,9]|431|451)|(50[0-9]|51[0,1])$/.test( code || this.statusCode );
    }

    getClassification()
    {
        return this.classification;
    }

    getStatusCode()
    {
        return this.statusCode;
    }

    getMessage()
    {
        return this.message;
    }

    getData()
    {
        return this.data;
    }

    statusText( code )
    {
        return this.codes[ code ] || this.message;
    }
}

module.exports = Response;