"use strict";

var FSM = require('../src/finitestatemachine');

describe("Finite State Machine", function() {
    var fsm = new FSM();
    var movementStates = {
        Still: {
            'walk': 'Walking',
            'run': 'Running'
        },
        Walking: {
            'rest': 'Still',
            'run': 'Running'
        },
        Running: {
            'rest': 'Walking'
        }
    };

    var count = 0;
    var inscreaseCount = function(event) {
        ++count;
    }

    beforeEach(function() {
        fsm = new FSM();
        fsm.addStates(movementStates, 'Still');
        count = 0;
    });

    describe("#addStates", function() {
        it("Initializes the state machine with states.", function() {
            expect(fsm._states['Walking']['rest']).toBe('Still');
        });
        it("Overrides states with the same name.", function() {
            fsm.addStates(movementStates);
            expect(fsm._states['Walking']['rest']).toBe('Still');
        });
        it("Sets the current state if initial state is passed in.", function() {
            fsm.addStates(movementStates, 'Still');
            expect(fsm.getCurrentState()).toBe('Still');
        });
    });

    describe("#handleStateEvent", function() {
        it("Updates the current state.", function() {
            fsm.handleStateEvent('walk');
            expect(fsm.getCurrentState()).toBe('Walking');
        });
        it("Triggers all change events.", function() {
            fsm.onChangeState(inscreaseCount);
            fsm.handleStateEvent('walk');
            expect(count).toBe(1);
        });
    });

    describe("#changeState", function() {
        it("Updates the current state.", function() {
            fsm.changeState('Walking');
            expect(fsm.getCurrentState()).toBe('Walking');
        });
        it("Triggers all change events.", function() {
            fsm.onChangeState(inscreaseCount);
            fsm.changeState('Walking');
            expect(count).toBe(1);
        });
    });


    describe("#onChangeState", function() {
        it("Adds a listener to be executed whenever the change state event is triggered.", function() {
            fsm.onChangeState(inscreaseCount);
            fsm.handleStateEvent('walk');
            expect(count).toBe(1);
        });
    });

    describe("#onChangeStateFromTo", function() {
        it("Adds a listener to be executed whenever the state changes from and to specific states event is triggered.", function() {
            fsm.onChangeStateFromTo('Still', 'Walking', inscreaseCount);
            fsm.handleStateEvent('walk');
            expect(count).toBe(1);
        });
    });
});
