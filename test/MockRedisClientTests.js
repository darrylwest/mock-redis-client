/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/3/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockRedisClient = require('../lib/MockRedisClient');

describe('MockRedisClient', function() {
    'use strict';

    describe('#instance', function() {
        var mock = new MockRedisClient();

        it('should create an instance of MockRedisClient', function() {
            should.exist( mock );
            mock.should.be.instanceof( MockRedisClient );
        });

        it('should have all known methods by count', function() {
            var methods = dash.methods( mock );

            methods.length.should.equal( 122 );
        });
    });
});