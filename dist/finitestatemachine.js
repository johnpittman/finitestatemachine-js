!function(t,e){"function"==typeof define&&define.amd?define(["./../../eventhandler/dist/eventhandler.js"],e):"object"==typeof exports?module.exports=e(require("eventhandler")):t.FSM=e(t.EventHandler)}(this,function(t){"use strict";function e(e){t.call(this,e||this),this._states={},this._currentState}return e.prototype=Object.create(t.prototype),e.constructor=e,e.prototype.addStates=function(t,e){for(var n in t)this._states[n]=t[n];void 0!==e&&this.setCurrentState(e)},e.prototype.changeState=function(t){if(void 0!==this._currentState){var e=this._states[this._currentState],n=e[t];void 0!==n&&this.setCurrentState(n)}},e.prototype.setCurrentState=function(t){if(void 0!==this._currentState){var e=this._currentState,n={from:e,to:t};this.emit("changeState:from."+e,n),this.emit("changeState:to."+t,n),this.emit("changeState:from."+e+">to."+t,n),this.emit("changeState",n)}this._currentState=t},e.prototype.getCurrentState=function(){return this._currentState},e.prototype.onChangeState=function(t){this.on("changeState",t)},e.prototype.onChangeStateFrom=function(t,e){this.on("changeState:from."+t,e)},e.prototype.onChangeStateTo=function(t,e){this.on("changeState:to."+t,e)},e.prototype.onChangeStateFromTo=function(t,e,n){var o=null===t?"":"from."+t;null!==t&&null!==e&&(o+=">"),o+=null===e?"":"to."+e,this.on("changeState:"+o,n)},e});
//# sourceMappingURL=finitestatemachine.js.map