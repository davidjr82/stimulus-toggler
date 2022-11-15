import { Controller } from '@hotwired/stimulus'
import { setListenedSubscriptions } from './../utils/utils_subscriptions';
import { replaceClasses, getClassesOn, getClassesOff } from './../utils/utils_html_classes';
import { aliasTransitions, aliasTabs, aliasActions } from './../utils/utils_alias';
import { debugShowObject, debugAppendActions, debugAppendListens } from './../utils/utils_debugging';

export default class extends Controller {

    static targets = ["toggleable"];

    static values = {
        states: Object,
        debug: Boolean,
    }

    controller_connected = false;
    subscriptions = {};

    // lifecycle: initialize, targetConnected, connect, targetDisconnected, disconnect
    initialize() {
        //
    }

    toggleableTargetConnected(element) {

        aliasTransitions(element, this);
        aliasTabs(element, this);
        aliasActions(element);

        debugAppendListens(this.debugValue, element);

        // register listeners
        let listened_states = element.dataset?.togglerListen?.split(',') || [];
        setListenedSubscriptions(this.subscriptions, element, listened_states);

        // initialize states (if not already initialized)
        this.autoInitializeStates(element);

        // change element classes if state is set when controller is already in dom (new added targets)
        if(this.controller_connected) {
            this.syncElementState(element, listened_states);
        }

        debugShowObject(this.debugValue, 'current-subscriptions', this.subscriptions);
    }

    connect() {
        document.querySelectorAll('[data-toggler-states]').forEach(element => aliasActions(element));

        // will override autoInitializeStates
        this.autoInitializeTabsByUrlHash();

        debugAppendActions(this.debugValue);

        // setTimeout to avoid transitions in the first load, otherwise
        // statesValueChanged from toggleableTargetConnected happens after setting controller_connected to true
        setTimeout(() => this.controller_connected = true, 0);
    }

    toggleableTargetDisconnected(element) {
        // remove element from subscriptions
        for (const subscription of Object.keys(this.subscriptions)) {
            for (const possible_state of Object.keys(this.subscriptions[subscription])) {
                let elements = this.subscriptions[subscription][possible_state];
                this.subscriptions[subscription][possible_state] = elements.filter(subscription_element => subscription_element !== element);
            }
        }
    }

    disconnect() {
        this.controller_connected = false;
    }

    // main actions
    states(event) {
        let states = event.currentTarget.dataset?.togglerStates?.toString()?.split(",") || [];
        this.setStates(states);
    }

    // main reaction
    statesValueChanged(newStates, oldStates) {

        debugShowObject(this.debugValue, 'current-states', newStates);

        let skip_transition = !this.controller_connected;

        Object.entries(newStates).forEach(([state, value]) => {

            if (value == oldStates[state]) {
                return;
            }

            if (!this.subscriptions[state] || !this.subscriptions[state][value]) {
                return;
            }

            if (['on', 'off'].includes(value)) {
                replaceClasses(this.subscriptions[state][value], state, value, skip_transition);
                return;
            }

            // value as text, all of that group goes to off except that element
            Object.entries(this.subscriptions[state]).forEach(([possible_value, elements]) => {
                replaceClasses(elements, state, (value == possible_value) ? 'on' : 'off', skip_transition);
            });

        }, this);
    }

    // state helpers
    autoInitializeStates(element) {

        let inital_states = element.dataset?.togglerInitial?.split(",") || [];

        if (inital_states.length) {
            this.setStates(inital_states);
            return;
        }

        if (element.hasAttribute('data-toggler-tab-active')) {
            this.setStates(element.dataset?.togglerStates?.split(",").filter(state => state.includes(':')) || []);
        }

        let listen = element.dataset?.togglerListen?.split(',') || [];

        listen.forEach(listened_state => {
            // not a toggle state
            if (listened_state.startsWith('+') || listened_state.startsWith('-') || listened_state.includes(':')) {
                return;
            }

            let sanitized_listened_state = listened_state.replace(/[^a-z0-9_]/gi, '_');

            // already initialized
            if (this.statesValue.hasOwnProperty(sanitized_listened_state)) {
                return;
            }

            let classesOn = getClassesOn(element, sanitized_listened_state);
            let classesOff = getClassesOff(element, sanitized_listened_state);

            let all_classes_on_present_in_element = classesOn.every(token => element.classList?.contains(token));
            let all_classes_off_missing_in_element = classesOff.every(token => !element.classList?.contains(token));

            let initial_set_state_token = (all_classes_on_present_in_element && all_classes_off_missing_in_element) ? '+' : '-';

            this.setStates([initial_set_state_token + sanitized_listened_state]);
        });
    }

    syncElementState(element, listened_states) {
        listened_states.forEach(listener => {
            let state = this.getStateNameFromListener(listener);
            let value = this.getStateValue(state);
            let skip_transition = !this.controller_connected;

            if(state != '' && value != '') {
                replaceClasses([element], state, value, skip_transition);
            }
        });
    }

    autoInitializeTabsByUrlHash() {
        // click tab links that matches url hash
        if (window.location.hash) {
            document.querySelectorAll("[href='" + window.location.hash + "']").forEach(tab_selector => {
                this.setStates(tab_selector.dataset?.togglerStates?.split(',') || []);
            });
        }
    }

    setStates(states) {

        states.forEach(new_state => {
            new_state = new_state.replace(/[^a-z0-9_\+\-\:]/gi, '');

            if (new_state.startsWith('+')) {
                this.setStateOn(new_state.substring(1));
            }

            else if (new_state.startsWith('-')) {
                this.setStateOff(new_state.substring(1));
            }

            else if (new_state.includes(':')) {
                let separator_position = new_state.indexOf(':');
                let state = new_state.substring(0, separator_position);
                let value = new_state.substring(separator_position + 1);

                this.setStatesValue(state, value);
            }

            else {
                this.setStateToggle(new_state);
            }

        }, this);
    }

    getStateValue(state) {
        if (!this.statesValue.hasOwnProperty(state)) {
            return '';
        }

        return this.statesValue[state];
    }

    getStateNameFromListener(listener) {

        if (listener.startsWith('+') || listener.startsWith('-')) {
            return listener.substring(1).replace(/[^a-z0-9_]/gi, '_');
        }

        if (listener.includes(':')) {
            return listener.split(':', 2)[0].replace(/[^a-z0-9_]/gi, '_');
        }

        return listener.replace(/[^a-z0-9_]/gi, '_');
    }

    // states helpers
    setStateOn(state) {
        this.setStatesValue(state, 'on');
    }

    setStateOff(state) {
        this.setStatesValue(state, 'off');
    }

    setStateToggle(state) {
        let actual_value = this.statesValue[state] || 'off';
        this.setStatesValue(state, actual_value == 'off' ? 'on' : 'off');
    }

    setStatesValue(state, value) {
        // sanitize to avoid unintended typos in name or values (replace non-valid-chars with _)
        state = state.replace(/[^a-z0-9_]/gi, '_');
        value = value.replace(/[^a-z0-9_]/gi, '_');

        if (state.length == 0 || value.length == 0) {
            return;
        }

        this.statesValue = Object.assign({}, this.statesValue, { [state]: value });
    }

    getParents(node) {
        return (node.parentElement ? this.getParents(node.parentElement) : []).concat([node]);
    }

    // helper reaction clickOutside
    clickOutside(event) {
        let states_to_set = [];

        // fill desired actions
        document.querySelectorAll('[data-toggler-click-outside]').forEach(element => {
            if (element == event.target) {
                return;
            }

            if (element.contains(event.target)) {
                return;
            }

            states_to_set = states_to_set.concat(element.dataset.togglerClickOutside.split(','));
        });

        if (states_to_set.length == 0) {
            return;
        }

        // unset undesired actions
        this.getParents(event.target).forEach(element => {

            if (!element.hasAttribute('data-toggler-click-outside-ignore')) {
                return;
            }

            let ignore = element.dataset.togglerClickOutsideIgnore.split(',');
            states_to_set = states_to_set.filter(token => !ignore.includes(token));
        });

        // go!
        this.setStates(states_to_set);
    }
}