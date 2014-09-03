/**
 * @class MockRedisClient
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/3/14
 */
var dash = require('lodash'),
    RedisMock = require('node-redis-mock');

var MockRedisClient = function() {
    'use strict';

    var mock = this,
        client = RedisMock.createClient();

    this.mset = function(list, callback) {
        list = dash.clone( list );

        var cb = function(err, model) {
            if (err) throw err;

            var key = list.shift();
            var value = list.shift();

            if (!key || !value) {
                return callback(null, 'ok');
            } else {
                // console.log(key, '=', value);
                client.set( key, value, cb );
            }
        };

        cb();
    };

    // re-assign all the methods
    dash.methods( client).forEach(function(method) {
        mock[ method ] = client[ method ];
    });


};

module.exports = MockRedisClient;

