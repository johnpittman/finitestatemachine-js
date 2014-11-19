/**
 * @author John Pittman <johnrichardpittman@gmail.com> 
 */
 
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['./../../statemanager/dist/StateManager.min.js'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('statemanager'));
    } else {
        // Browser globals (root is window)        
        root.FiniteStateMachine = factory(root.StateManager);
        root.FSM = root.FiniteStateMachine;
    }
}(this, function(StateManager) {
    'use strict'

    /**
     * @constructor
     * @param {object} [owner=this]
     */
    function FSM(owner) {
        StateManager.call(this, owner || this);
    }

    FSM.prototype = Object.create(StateManager.prototype);
    FSM.constructor = FSM;

    /**
     * Initializes the states collection with more states.
     * Every state already has a 'Default' event
     * @param {object} states
     * @param {string} [initialState]
     */
    FSM.prototype.addStates = function(states, initialState) {
        StateManager.prototype.addStates.call(this, states, initialState);
    };

    /**
     * Looks up the event passed in from the state's event map and return the new state if the event exists.
     * @param  {string} event
     * @param  {*} [data] - Data to be access by all event listeners.
     */
    FSM.prototype.handleEvent = function(event, data) {
        if (this._currentState !== undefined) {
            var state = this._states[this._currentState];
            if (state !== undefined)
                if (state.events !== undefined) {
                    var nextState = state.events[event];

                    if (nextState !== undefined) {
                        var data = {
                            event: event,
                            data: data
                        };

                        this.emit(event, data);
                        this.changeState(nextState, data);
                    }
                }
        }
    };

    return FSM;
}));
