/** ****************************************************************************************************
 * File: index-test.js
 * Project: http-response-class
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Oct-2017
 *******************************************************************************************************/
'use strict';

const
    chai     = require( 'chai' ),
    expect   = chai.expect,
    Response = require( '../index' ),
    obj      = {
        statusCode: 200,
        data: 'pong',
        message: 'OK'
    };

describe( 'Response [http-response-class]', () => {
    const
        successful = new Response( 200, 'pong' ),
        warning    = new Response( 199, 'warning' ),
        failed     = new Response( 400, 'pong', 'tests', 'Bad Request' );
    
    it( `[Response.codes]               should return list of HTTP Status Codes`,
        () => expect( Object.keys( Response.codes ).length ).to.be.gt( 70 )
    );
    
    it( `[Response.isInformational]     should be true for informational HTTP code`,
        () => expect( Response.isInformational( 100 ) ).to.be.true
    );
    
    it( `[Response.isSuccess]           should be true for successful HTTP code`,
        () => expect( Response.isSuccess( 200 ) ).to.be.true
    );
    
    it( `[Response.isRedirection]       should be true for redirection HTTP code`,
        () => expect( Response.isRedirection( 300 ) ).to.be.true
    );
    
    it( `[Response.isClientError]       should be true for client error HTTP code`,
        () => expect( Response.isClientError( 400 ) ).to.be.true
    );
    
    it( `[Response.isServerError]       should be true for server error HTTP code`,
        () => expect( Response.isServerError( 500 ) ).to.be.true
    );
    
    it( `[Response.isWarning]           should be true for warning HTTP code`,
        () => expect( Response.isWarning( 110 ) ).to.be.true
    );
    
    it( `[Response.isHTTPCode]          should be true for any RFC defined HTTP code`,
        () => Object.keys( Response.codes )
            .reduce(
                ( r, code ) => r ? Response.isHTTPCode( code ) : false, true
            )
    );
    
    it( `[Response.getMessageForCode]   should return status message for HTTP code`,
        () => expect( Response.getMessageForCode( 100 ) ).to.eq( 'Continue' )
    );
    
    it( `[successful.getClassification] should return "Success"`,
        () => expect( successful.getClassification() ).to.eq( 'Success' )
    );
    
    it( `[successful.getStatusCode]     should return 200`,
        () => expect( successful.getStatusCode() ).to.eq( 200 )
    );
    
    it( `[successful.getMessage]        should return "OK"`,
        () => expect( successful.getMessage() ).to.eq( 'OK' )
    );
    
    it( `[successful.getData]           should return "pong"`,
        () => expect( successful.getData() ).to.eq( 'pong' )
    );
    
    it( `[successful.getPacket]         should return ${JSON.stringify( obj )}`,
        () => expect( successful.getPacket() ).to.deep.eq( obj )
    );
    
    it( `[successful.isSuccess]         should be true for successful HTTP code`,
        () => expect( successful.isSuccess() ).to.eq( true )
    );
    
    it( `[successful.statusText]        should be status text "OK"`,
        () => expect( successful.statusText() ).to.eq( 'OK' )
    );
    
    it( `[successful.isHTTPCode]        should be true for isHTTPCode`,
        () => expect( successful.isHTTPCode( 299 ) ).to.eq( true )
    );
    
    it( `[warning.isWarning]            should be true for warning HTTP code`,
        () => expect( warning.isWarning() ).to.eq( true )
    );
    
    it( `[warning.isWarning]            should be true for warning HTTP code`,
        () => expect( warning.isWarning( 214 ) ).to.eq( true )
    );
    
    it( `[failed.isClientError]         should be true for Client Error Code`,
        () => expect( failed.isClientError() ).to.be.true
    );
    
    it( `[failed.metadata]              should return have metadata`,
        () => expect( failed.metadata ).to.deep.eq( [ 'Bad Request' ] )
    );
    
    it( `[failed.metadata]              should return have metadata`,
        () => expect( failed.origin ).to.eq( 'tests' )
    );
    
    it( `[Symbol.hasInstance]           should be true`,
        () => expect( obj instanceof Response ).to.be.true
    );
    
    it( `[Symbol.toStringTag]           should return [object Response]`,
        () => expect( Object.prototype.toString.call( new Response() ) ).to.eq( '[object Response]' )
    );
    
    it( `[successful.setStatusCode]     should set message to No Content`,
        () => {
            successful.setStatusCode( 204 );
            expect( successful.message ).to.eq( 'No Content' );
        }
    );
    
    it( `[successful.setStatusCode]     should set code to 205`,
        () => {
            successful.setStatusCode( 205 );
            expect( successful.statusCode ).to.eq( 205 );
        }
    );
    
    it( `[successful.setMessage]        should set statusCode to 425`,
        () => {
            successful.setMessage( 'Unordered Collection' );
            expect( successful.statusCode ).to.eq( 425 );
        }
    );
    
    it( `[successful.setMessage]        should set message to Permanent Redirect`,
        () => {
            successful.setMessage( 'Permanent Redirect' );
            expect( successful.message ).to.eq( 'Permanent Redirect' );
        }
    );
} );