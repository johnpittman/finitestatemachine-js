"use strict";

var FSM = require('../src/FiniteStateMachine');

describe("FiniteStateMachine", function() {
    var fsm = new FSM();
    var count = 0;

    var inscreaseCount = function(event) {
        ++count;
    }

    beforeEach(function() {
        fsm = new FSM();
        count = 0;
    });
});
