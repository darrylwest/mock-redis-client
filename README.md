# Mock Redis Client
- - -

A redis mock for node

[![NPM version](https://badge.fury.io/js/mock-redis-client.svg)](http://badge.fury.io/js/mock-redis-client) [![Build Status](https://travis-ci.org/darrylwest/mock-redis-client.svg?branch=develop)](https://travis-ci.org/darrylwest/mock-redis-client) [![Dependency Status](https://david-dm.org/darrylwest/mock-redis-client.svg)](https://david-dm.org/darrylwest/mock-redis-client)

# Introduction

The mock redis client barrows methods from [node-redis-mock](https://github.com/darrylwest/mock-redis-client) which was originally cloned from redis-mock.  There are a few more implementations, like mset, mget, etc.

This project isn't a clone of mock-redis-client or mock-redis, rather it uses encapulation to inherit methods implemented by the base object.  It's a cleaner way of extending the original works from both projects.

# Installation

~~~
	npm install mock-redis-client --save-dev
~~~

# Use

~~~
	var MockRedisClient = require('mock-redis-client');

    var client = new MockRedisClient();
~~~

Or if you need to mock redis itself, then do this:

~~~
    var redis = require('mock-redis-client').createMockRedis();

    var client = redis.createClient();
~~~

# API

Currently implemented are the following:

## General

* createClient
* end

## Events

* ready
* connect
* end
* subscribe
* unsubscribe
* message

## Publish/subscribe
* publish
* subscribe
* unsubscribe

## Keys
* del
* keys
* exists
* expire

## Strings
* get
* set
* incr
* mset
* mget

## Hashing
* hset
* hsetnx
* hget
* hexists
* hdel
* hlen
* hgetall
* hmset
* hkeys
* hincrby

## Lists
* llen
* lpush
* rpush
* lpushx
* rpushx
* lpop
* rpop
* blpop
* brpop
* lindex
* lset
* rpoplpush

## Server
* flushdb
* flushall
* save
* lastsave
* time
* dbsize (always returns zero)
* ping

## Transactions
* multi
* exec
* every previous supported commands can be chained

# Tests

~~~
    make test

    or

    make watch

    or

    grunt mochaTest jshint validate-package
~~~

- - -
<p><small><em>Copyright © 2014-2015, rain city software | Version 0.90.15</em></small></p>
