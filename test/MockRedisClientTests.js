/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/3/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    casual = require('casual'),
    uuid = require('node-uuid'),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockRedisClient = require('../lib/MockRedisClient');

describe('MockRedisClient', function() {
    'use strict';

    var createPairs = function(count) {
        if (!count) count = 25;

        var pairs = [];

        while (count-- > 0) {
            pairs.push( uuid.v4() );
            pairs.push( casual.sentence );
        }

        return pairs;
    };

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

    describe('#mset/mget', function() {
        var mock = new MockRedisClient();

        it('should set a list of key/values', function(done) {
            var callback,
                pairs = createPairs();

            callback = function(err, status) {
                should.not.exist( err );
                should.exist( status );

                done();
            };

            mock.mset( pairs, callback );
        });

        it('should get a set of values from keys');
    });
});