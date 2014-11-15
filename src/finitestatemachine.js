(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['./../../eventhandler/dist/eventhandler.min.js'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('eventhandler'));
    } else {
        // Browser globals (root is window)
        root.FSM = factory(root.EventHandler);
    }
}(this, function(EventHandler) {
    'use strict'

    /**
     * @constructor
     * @param {object} [owner]
     */
    function FSM(owner) {
        EventHandler.call(this, owner || this);

        this._states = {};
        this._currentState;
        this._prevState;
    }

    FSM.prototype = Object.create(EventHandler.prototype);
    FSM.constructor = FSM;

    /**
     * Initializes the states collection with more states.
     * Every state already has a 'Default' event
     * @param {object} [states] - {
     *                              StateOne: {
     *                                          'EventOne' : 'StateTwo'
     *                                        },
     *                              StateTwo: {
     *                                          'EventTwo' : 'StateOne'
     *                                        }
     *                          }
     * @param {string} [initialState]
     */
    FSM.prototype.addStates = function(states, initialState) {
        if (typeof states === 'object')
            for (var state in states) {
                this._states[state] = states[state];
            }

        if (initialState !== undefined)
            this.setCurrentState(initialState);
    };

    /**
     * Looks up the event passed in from the state's event map and return the new state if the event exists.
     * @param  {string} event
     */
    FSM.prototype.handleStateEvent = function(event) {
        if (this._currentState !== undefined) {
            var eventMap = this._states[this._currentState];
            var nextState = eventMap[event];

            if (nextState !== undefined) {
                this.setCurrentState(nextState);
                this.triggerChangeEvents(event);
            }
        }
    };

    /**
     * Emits all change events.
     * @param  {string} event
     */
    FSM.prototype.triggerChangeEvents = function(event) {
        var currState = this._currentState;
        var prevState = this._prevState;

        var data = {
            event: event,
            from: prevState,
            to: currState
        };

        this.emit('changeState:from.' + prevState, data);
        this.emit('changeState:to.' + currState, data);
        this.emit('changeState:from.' + prevState + '>to.' + currState, data);
        this.emit('changeState', data);
    };


    /**
     * Updates the current state to the state that's passed in. Emits all change events.
     * @param  {string} state
     */
    FSM.prototype.changeState = function(state) {
        this.setCurrentState(state);
        this.triggerChangeEvents();
    };

    /**
     * Modifier.
     * Fires event(s) with data pertaining to the state.
     * Sets the current state to the state passed in without triggering events if it's the initial state.
     * @param {string} state
     */
    FSM.prototype.setCurrentState = function(state) {
        if (this._currentState !== undefined)
            this._prevState = this._currentState.toString();
        this._currentState = state;
    };

    /**
     * Accessor.
     */
    FSM.prototype.getCurrentState = function() {
        return this._currentState;
    };

    /**
     * Accessor.
     */
    FSM.prototype.getPreviousState = function() {
        return this._prevState;
    };

    /**
     * Adds a listener to be triggered when the state changes.
     * @param  {function} callback - Is passed an optional paramater for event data.
     */
    FSM.prototype.onChangeState = function(callback) {
        this.on('changeState', callback);
    };

    /**
     * Adds a listener to be triggered when the state changes from a specific state.
     * @param  {string} from
     * @param  {function} callback - Is passed an optional paramater for event data.
     */
    FSM.prototype.onChangeStateFrom = function(from, callback) {
        this.on('changeState:from.' + from, callback);
    };

    /**
     * Adds a listener to be triggered when the state changes
     * @param  {string} to
     * @param  {function} callback - Is passed an optional paramater for event data.
     */
    FSM.prototype.onChangeStateTo = function(to, callback) {
        this.on('changeState:to.' + to, callback);
    };

    /**
     * Adds a listener to be triggered when the state changes
     * @param  {string|null} from
     * @param  {string|null} to
     * @param  {function} callback - Is passed an optional paramater for event data.
     */
    FSM.prototype.onChangeStateFromTo = function(from, to, callback) {
        var fromToStr = (from === null) ? '' : 'from.' + from;
        if ((from !== null) && (to !== null))
            fromToStr += '>';
        fromToStr += (to === null) ? '' : 'to.' + to;

        this.on('changeState:' + fromToStr, callback);
    };

    return FSM;
}));
