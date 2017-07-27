/**
 * XXX Write some documentation here
 */

module.exports = function(RED) {
    "use strict";

    const RDServer = require('coap-rd');
    const URI = require('uri-js');

    function CoapRdNode(options) {
        RED.nodes.createNode(this, options);

        const node = this;
        node.options = options;

	const RD = new RDServer(options);

	// XXX Get a better name for this
	function report(ep) {
	    console.log("==== Report ====");
	    console.log(ep);
	    // XXX It is silly that we cannot pass URL as an object...
	    var url = URI.serialize(ep.con);
	    if (ep.resources) {
		ep.resources.forEach((res) => {
		    const newMsg = {
			url:   url + res.href,
			ep:    ep,
		    };
		    console.log("url=" + newMsg.url);
		    node.send(newMsg);
		});
	    }
	}

	RD.on('register', function(ep) { report(ep); });
	RD.on('update',   function(ep) { report(ep); });

        return node;
    }
    RED.nodes.registerType("coap-rd", CoapRdNode);
}
