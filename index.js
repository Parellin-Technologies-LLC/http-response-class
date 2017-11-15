/** ****************************************************************************************************
 * File: index.js
 * Project: http-response-class
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 11-Jul-2017
 *******************************************************************************************************/
'use strict';

// @formatter:off

class Response
{
    constructor( statusCode, data, origin, ...metadata )
    {
        if( statusCode instanceof Response )
            return statusCode;
        else if( data instanceof Response )
            return data;
        else if( origin instanceof Response )
            return origin;
        else if( metadata instanceof Response || metadata[ 0 ] instanceof Response )
            return metadata[ 0 ] || metadata;
        
        if( statusCode && ( typeof statusCode !== 'number' || statusCode !== +statusCode ) )
            throw 'Argument Error - [statusCode] must be typeof number.';
        else if( statusCode && !this.isHTTPCode( statusCode ) )
            throw 'Argument Error - [statusCode] must be valid HTTP code';
        else
            this.setClassification( statusCode );
        
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
        
        if( origin )
            this.origin = origin;
        
        if( metadata.length )
            this.metadata = metadata;
    }
    
    getCodeFromMessage( message )
    {
        for( const code in this.codes ) {
            if( this.codes.hasOwnProperty( code ) ) {
                if( this.codes[ code ] === message ) {
                    return +code;
                }
            }
        }
    }
    
    getPacket()
    {
        const res = {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        };
        
        if( this.origin )
            res.origin = this.origin;
        
        if( this.metadata )
            res.metadata = this.metadata;
        
        return res;
    }
    
    toString()
    {
        return JSON.stringify( this.getPacket() );
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
    
    setStatusCode( code, message )
    {
        if( this.isHTTPCode( code ) ) {
            this.statusCode = code;
            this.message    = this.statusText( code );
        } else {
            this.statusCode = code;
            this.message    = message;
        }
        
        this.setClassification( code );
    }
    
    getMessage()
    {
        return this.message;
    }
    
    setMessage( message, code )
    {
        code = this.getCodeFromMessage( message ) || code;
        this.statusCode = code;
        this.message    = message;
        this.setClassification( code );
    }
    
    getData()
    {
        return this.data;
    }
    
    setClassification( code )
    {
        if( this.isInformational( code ) )
            this.classification = 'Informational';
        else if( this.isSuccess( code ) )
            this.classification = 'Success';
        else if( this.isRedirection( code ) )
            this.classification = 'Redirection';
        else if( this.isClientError( code ) )
            this.classification = 'Client Error';
        else if( this.isServerError( code ) )
            this.classification = 'Server Error';
        else
            this.classification = 'Unknown';
    }
    
    statusText( code )
    {
        return this.codes[ code ] || this.message;
    }
    
    get [ Symbol.toStringTag ]()
    {
        return this.constructor.name || 'Response';
    }
    
    static [ Symbol.hasInstance ]( obj )
    {
        return obj ? (
            obj.hasOwnProperty( 'statusCode' ) &&
            obj.hasOwnProperty( 'message' ) &&
            obj.hasOwnProperty( 'data' )
        ) : false;
    }
}

module.exports = Response;