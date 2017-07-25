/**
 * XXX Write some documentation here
 */

module.exports = function(RED) {
    "use strict";

    const url = require('coap-rd');

    function CoapRdNode(options) {
        RED.nodes.createNode(this, options);

        const node = this;
        node.options = options;

        return node;
    }
    RED.nodes.registerType("coap-rd", CoapRdNode);
}
