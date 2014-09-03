# Websocket Spell Check Service
- - -

A real-time spell checking service over web sockets.

[![NPM version](https://badge.fury.io/js/websocket-spellcheck-service.svg)](http://badge.fury.io/js/websocket-spellcheck-service) [![Build Status](https://travis-ci.org/darrylwest/websocket-spellcheck-service.svg?branch=develop)](https://travis-ci.org/darrylwest/websocket-spellcheck-service) [![Dependency Status](https://david-dm.org/darrylwest/websocket-spellcheck-service.svg)](https://david-dm.org/darrylwest/websocket-spellcheck-service)

## Introduction

The Websocket Spellcheck Service provides a remote real-time service to check word spelling from browser or other text input applications.  The spell checker is based on [node-spellchecker](https://github.com/atom/node-spellchecker) and uses the hunspell project.

## Installation

### Server

~~~
	npm install websocket-spellcheck-service --save
~~~

### Client/Browser

The project includes a "browser" folder with enough to create a websocket spell checker.  Here is a short snippet of the browser code:

~~~
<!DOCTYPE html>
<html>
<head>
    <title>spell check page</title>
    <script src="browser-messaging-commons.js"></script>
    <script src="messaging-config.js"></script>
    <script src="SpellCheckClient.js"></script>
    <script>
        var client;

        var start = function() {
            var options = readMessagingConfig();
            console.log( JSON.stringify( options ));

            client = SpellCheckClient.createInstance( options );

            client.start();

            window.client = client;
        };

    </script>
</head>
~~~

The clint API has a single method: checkSpelling(word).  The word is sent down the socket with a request to check the spelling with the response being delivered to a closure called checkResultCallback that is set in the constuctor options.  If the spelling is correct, the reponse from the service looks like this:

~~~
{
	"word":"expectorant",
    "correct":true
}
~~~

If an error is detected in the spelling, the response includes spelling suggestions and looks like this:

~~~
{
	"word":"spitx",
    "correct":false,
    "suggestions":["spits","spit","spite","spitz"]
}
~~~

Or this:

~~~
{
	"word":"expector",
    "correct":false,
    "suggestions":[
    	"expiator",
        "expeditor",
        "expect",
        "expected",
        "expects",
        "expect or",
        "expect-or"
    ]
}
~~~

### Server

The project includes a "bin" folder with a run/start/stop and status scripts.  The run script is the same as start, but it runs in the forgound.  It looks something like this:

~~~
	var config = require('./config.json'),
    	SpellCheckService = require('websocket-spellcheck-service'),
        service = SpellCheckService.createInstance( config );

    service.start();
~~~

If you have a message service running on this port, then this is enough to start the public producer channel that responds to spell check requests.  To create and start a generic message service, see [this commons project](https://www.npmjs.org/package/node-messaging-commons).

## Configuration

Here is a sample configuration file.

~~~
{
    "port":29169,
    "hubName":"/MessageHub",
    "channels":[ "/spellcheck" ],
    "appkey":"71268c55-a8b3-4839-a1f5-34e3d6e70fdd"
}
~~~

You would want to have a proxy and preferrably HTTPS in front of this but port 29169 works for development.

## Tests

Unit tests include should/specs, jshint and validate-package.  Tests can be run from the command line with this:

~~~
    make test

    or

    make watch

    or

    grunt mochaTest jshint validate-package
~~~

- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.16</em></small></p>
