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
            pairs.push( 'Key:' + uuid.v4() );
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
            var methods = dash.functions( mock );

            methods.length.should.equal( 129 );
        });
    });

    describe('createMockRedis', function() {
        it('should create an instance of mock redis', function() {
            var mock = MockRedisClient.createMockRedis();

            should.exist( mock );
            mock.createClient.should.be.a('function');
        });
    });

    describe('#mset/mget', function() {
        var mock = new MockRedisClient(),
            pairs = createPairs();

        it('should set a list of key/values', function(done) {

            var callback = function(err, status) {
                should.not.exist( err );
                should.exist( status );

                console.log( status );

                done();
            };

            mock.mset( pairs, callback );
        });

        it('should get a set of values from keys', function(done) {
            var callback = function(err, values) {
                should.not.exist( err );
                should.exist( values );

                values.length.should.equal( pairs.length / 2 + 1);
                values[0].should.equal(pairs[1]);
                values[1].should.equal(pairs[3]);
                should.equal(values[values.length - 1], null);

                done();
            };

            var keys = [];
            for (var i = 0; i < pairs.length; i += 2) {
                keys.push( pairs[i] );
            }
            keys.push('absent key');

            mock.mget( keys, callback );
        });

        it('should return keys in the correct order and include nulls when key is not found', function(done) {
            var keys = [],
                expectedValues = [],
                callback;

            callback = function(err, values) {
                should.not.exist( err );
                should.exist( values );
                
                values.length.should.equal( keys.length );

                values.forEach(function(value) {
                    var expected = expectedValues.shift();
                    if (value !== null) {
                        value.should.equal(expected);
                    } else {
                        should.not.exist( expected );
                    }
                });

                done();
            };

            pairs.forEach(function(item) {
                if (dash.startsWith( item, 'Key:')) {
                    keys.push( item );
                } else {
                    expectedValues.push( item );
                }
            });

            // now patch in some unknown keys
            keys[ 4 ] = 'nil-key-1';
            expectedValues[ 4 ] = null;

            keys[ 10 ] = 'nil-key-2';
            expectedValues[ 10 ] = null;

            mock.mget( keys, callback );
        });
    });
});
