finitestatemachine-js
=====================

A simple finite state machine built to use as a mechanism to feed other/larger components.

<h1>Notes</h1>

Universal module defined to be used with <b>requirejs</b>, <b>node</b>, <b>commonjs</b>, or <b>global scoped</b> if no module loader is used.

- All files in the <b>dist</b> folder are minified for <b>production</b> use.
- All files in the <b>src</b> directory are the source code for <b>development</b> use.
- Packages point at the <b>dist</b> minified code with <b>source maps</b>.

<h1>Use</h1>

    var TestStates = {
        StateOne: {
            'EventOne': 'StateTwo'
        },
        StateTwo: {
            'EventTwo': 'StateOne'
        }
    }

    var fsm = new FSM(this);

    fsm.addStates(TestStates, 'StateOne');
    console.log(fsm.getCurrentState());

    fsm.changeState('EventOne');
    console.log(fsm.getCurrentState());

    var increaseCountCallback = function(event) {
        console.log('State changed!');
        console.log('From:' + event.from);
        console.log('To:' + event.to);
    };

    fsm.onChangeStateFromTo('StateTwo', 'StateOne', increaseCountCallback);

    fsm.changeState('EventTwo');
    console.log(fsm.getCurrentState());

<h1>Development</h1>

<h4>Requirements</h4>

- nodejs
- npm install
- npm install -g gulp bower

<h4>Test</h4>

gulp test

<h4>Gulp Commands</h4>

- gulp test
- gulp build
