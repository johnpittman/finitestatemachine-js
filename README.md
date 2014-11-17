finitestatemachine
==================

A simple finite state machine built to use as a mechanism to feed other/larger components.

<h1>Notes</h1>

Universal module defined to be used with <b>requirejs</b>, <b>node</b>, <b>commonjs</b>, or <b>global scoped</b> if no module loader is used.

- All files in the <b>dist</b> folder are minified for <b>production</b> use.
- All files in the <b>src</b> directory are the source code for <b>development</b> use.
- Packages point at the <b>dist</b> minified code with <b>source maps</b>.

<h1>Usage</h1>

<h4>Installation</h4>

npm: npm install finitestatemachine<br />
bower: bower install finitestatemachine

<h4>How to use...</h4>

    var TestStates = {
        StateOne: {
            'EventOne': 'StateTwo'
        },
        StateTwo: {
            'EventTwo': 'StateOne'
        }
    }

    var increaseCountCallback = function(event) {
        console.log('State change listener!');
        console.log('Event:' + event.event);
        console.log('From:' + event.from);
        console.log('To:' + event.to);
    };

    var fsm = new FSM(this);

    fsm.onChangeState(increaseCountCallback);
    fsm.onChangeStateFromTo('StateTwo', 'StateOne', increaseCountCallback);

    console.log('fsm.addStates(TestStates, "StateOne");');
    fsm.addStates(TestStates, 'StateOne');
    console.log('Previous state:' + fsm.getPreviousState());
    console.log('Initial state:' + fsm.getCurrentState());

    console.log('fsm.handleStateEvent("EventOne");');
    fsm.handleStateEvent('EventOne');
    console.log('Previous state:' + fsm.getPreviousState());
    console.log('Current state:' + fsm.getCurrentState());

    console.log('fsm.changeState("StateOne");');
    fsm.changeState('StateOne');
    console.log('Previous state:' + fsm.getPreviousState());
    console.log('Current state:' + fsm.getCurrentState());

<h1>Development</h1>

<h4>Requirements</h4>

- nodejs
- npm install
- npm install -g gulp bower

<h4>Test</h4>

gulp test

<h4>Gulp Commands</h4>

Each process is dependent upon the previous. If one fails the build process exits.

- gulp test (Unit specifications)
- gulp build (Test, folder clean-ups, minification, source maps, renaming)
- gulp deploy (Test, build, versioning)

<h1>Release Notes</h1>

<h3>v1.0.4</h3>

<h4>Bug Fixes...</h4>

- Fixed sourcemap linking for minified files. This is also fixed as part of the build process to automate proper sourcemap creation and linking.

<h3>v1.0.2</h3>

<h4>Breaking Changes...</h4>

- Removed ability for addStates' states parameter to be optional.

<h3>v1.0.1</h3>

<h4>Breaking Changes...</h4>

- setCurrentState no longer tiggers the change events. Use triggerChangeEvents to explicity trigger events for the current state.
- changeState has been deprecated to handleStateEvent.
- changeState now takes a state as the parameter, changes the current state, and triggers the change events with the event.event data being undefined.
- Previous state remains undefined until the state changes after initial state.

<h4>Additional Changes...</h4>

- Added getPreviousState() to fetch the previous state.
- Changed global variable name to FiniteStateMachine but kept support for global FSM if one doesn't exist to avoid confilcts.
