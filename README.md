finitestatemachine
==================

A finite state machine built to use as a mechanism to feed other/larger components. JavaScript performance oriented.

<h1>Notes</h1>

Universal module defined to be used with <b>requirejs</b>, <b>node</b>, <b>commonjs</b>, or <b>global scoped</b> if no module loader is used.

- All files in the <b>dist</b> folder are minified for <b>production</b> use.
- All files in the <b>src</b> directory are the source code for <b>development</b> use.
- Packages point at the <b>dist</b> minified code with <b>source maps</b>.

<h1>Development</h1>

<h4>Requirements</h4>

- nodejs
- npm install
- npm install -g gulp

<h4>Test</h4>

gulp test

<h4>Gulp Commands</h4>

Each process is dependent upon the previous. If one fails the build process exits.

- gulp
- gulp test (Unit specifications)
- gulp build (Test, folder clean-ups, minification, source maps, renaming)
- gulp deploy (Test, build, versioning)

<h1>Usage</h1>

<h4>Installation</h4>

npm: npm install finitestatemachine<br />
bower: bower install finitestatemachine

<h4>How to use...</h4>

    var stateExample = {
        enter: function() {},
        leave: function() {},
        events: {                               // Optional
            'event': 'State',
        },
        transitions: {
            beforeEnter: function() {},         // Optional
            beforeEnterFromStill: function() {},// Optional
            leaveToWalking: function() {},      // Optional
        }
    };

    var movementStates = {
        'Still': {
            enter: function() {
                console.log('Standing Still.');
            },
            leave: function() {
                console.log('Leaving \'Still\'.');
            },
            transitions: {
                beforeEnter: function() {
                    console.log('Transitioning to \'Still\'.');
                }
            },
            events: {
                'move': 'Walking',
                'sprint': 'Running'
            }
        },
        'Walking': {
            enter: function() {
                console.log('Walking.');
            },
            leave: function() {
                console.log('Leaving \'Walking\'.');
            },
            transitions: {
                beforeEnter: function() {
                    console.log('Transitioning to \'Walking\'.');
                }
            },
            events: {
                'move': 'Running',
                'sprint': 'Running',
                'relax': 'Still',
                'stop': 'Still'
            }
        },
        'Running': {
            enter: function() {
                console.log('Running.');
            },
            leave: function() {
                console.log('Leaving \'Running\'.');
            },
            transitions: {
                beforeEnterFromWalking: function() {
                    console.log('Enter \'Running\' from \'Walking\'.');
                },
                leaveToStill: function() {
                    console.log('Leave \'Running\' to \'Still\'.');
                }
            },
            events: {
                'relax': 'Walking',
                'stop': 'Still'
            }
        }
    }

    var listener1 = function(data) {
        console.log('State change listener!');
        console.log(JSON.stringify(data));
    };

    var movementStateManager = new FiniteStateMachine(this);

    console.log('Adding states.');
    movementStateManager.initialize(movementStates, 'Still');

    console.log('Initial state: ' + movementStateManager.getCurrentStateId());

    console.log('Handle event: move');
    movementStateManager.handleEvent('move');

    console.log('Handle event: move');
    movementStateManager.handleEvent('relax');

    console.log('Handle event: move');
    movementStateManager.handleEvent('sprint');

    console.log('Handle event: move');
    movementStateManager.handleEvent('relax');

<h1>Release Notes</h1>

<h3>v2.1.5</h3>

- See statemanager package release notes.

<h3>v2.1.0</h3>

- See statemanager package release notes.

<h3>v2.0.0</h3>

<h4>Breaking Changes...</h4>

- Complete rework.
- Built on top of my StateManager (npm/bower install statemanager). A machine is meant to have managers so this makes more sense and extracts reusable functionality.
- handleStateEvent() is now handleEvent().

<h4>Additional Changes...</h4>

- Added getPreviousState() to fetch the previous state.
- Changed global variable name to FiniteStateMachine but kept support for global FSM if one doesn't exist to avoid confilcts.

<h3>v1.2.0</h3>

- Added ability to reset to the initial state.

<h3>v1.1.5</h3>

- Added ability to pass data to handleStateEvent(event, data), changeState(state, data), and triggerChangeEvents(event, data). This allows for the data to be distributed to all change event listeners. 

    Ex. var listener = function(event){
        console.log(event.event);
        console.log(event.from);
        console.log(event.to);
        console.log(event.data); // Can be anything but typcially would be an object.
    }

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
