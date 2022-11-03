import { Controller } from '@hotwired/stimulus'
import { setListenedSubscriptions } from './../utils/utils_subscriptions';
import { replaceClasses, getClassesOn, getClassesOff } from './../utils/utils_html_classes';
import { aliasTabs, autoInitAction } from './../utils/utils_alias';
import { debugShowStates, debugAppendActions, debugAppendListens } from './../utils/utils_debugging';

export default class extends Controller {

    static targets = ["toggleable"];

    static values = {
        states: Object,
        debug: Boolean,
    }
    first_load_skip_transition = true;
    subscriptions = {};

    // lifecycle: initialize, targetConnected, connect, targetDisconnected, disconnect
    initialize() {
        //
    }

    toggleableTargetConnected(element) {

        aliasTabs(element, this);
        autoInitAction(element);

        debugAppendListens(this.debugValue, element);

        // register listeners
        let listened_states = element.dataset?.togglerListen?.split(',') || [];
        setListenedSubscriptions(this.subscriptions, element, listened_states);

        // initialize states (if not already initialized)
        this.autoInitializeStates(element);

        // change element classes if state is set (for elements connected once the dom is already there)
        if (!this.first_load_skip_transition) {
            this.syncElementState(element, listened_states);
        }
    }

    connect() {

        document.querySelectorAll('[data-toggler-states]').forEach(element => autoInitAction(element));

        this.autoInitializeTabs();

        debugAppendActions(this.debugValue);
        debugShowStates(this.debugValue, 'current-subscriptions', this.subscriptions);
    }

    toggleableTargetDisconnected(element) {
        // todo: remove element from subscriptions
    }

    disconnect() {
    }

    // main actions
    states(event) {
        // set first_load_skip_transitions to false in the first interaction (after the initial load of everything)
        this.first_load_skip_transition = false;

        let states = event.currentTarget.dataset?.togglerStates?.toString()?.split(",") || [];
        this.setStates(states);
    }

    // main reaction
    statesValueChanged(newStates, oldStates) {

        debugShowStates(this.debugValue, 'current-states', newStates);

        Object.entries(newStates).forEach(([state, value]) => {

            if (value == oldStates[state]) {
                return;
            }

            if (!this.subscriptions[state] || !this.subscriptions[state][value]) {
                return;
            }

            if (['on', 'off'].includes(value)) {
                replaceClasses(this.subscriptions[state][value], state, value, this.first_load_skip_transition);
                return;
            }

            // value as text, all of that group goes to off except that element
            Object.entries(this.subscriptions[state]).forEach(([possible_value, elements]) => {
                replaceClasses(elements, state, (value == possible_value) ? 'on' : 'off', this.first_load_skip_transition);
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

            // already initialized
            if (this.statesValue.hasOwnProperty(listened_state)) {
                return;
            }

            let classesOn = getClassesOn(element, listened_state);
            let classesOff = getClassesOff(element, listened_state);

            let all_classes_on_present_in_element = classesOn.every(token => element.classList?.contains(token));
            let all_classes_off_missing_in_element = classesOff.every(token => !element.classList?.contains(token));

            let initial_set_state_token = (all_classes_on_present_in_element && all_classes_off_missing_in_element) ? '+' : '-';

            this.setStates([initial_set_state_token + listened_state]);
        });
    }

    syncElementState(element, listened_states) {
        listened_states.forEach(listener => {
            let state = this.getStateNameFromListener(listener);
            let value = this.getStateValue(state);

            replaceClasses([element], state, value, true);
        });
    }

    autoInitializeTabs() {

        // click tab links that matches url hash
        if (window.location.hash) {
            document.querySelectorAll("[href='" + window.location.hash + "']").forEach(tab_selector => {
                this.setStates(tab_selector.dataset?.togglerStates?.split(',') || []);
            });
        }

        let uninit_tabs = Object.keys(this.subscriptions).filter(k => k.startsWith('tab_') && !this.statesValue.hasOwnProperty(k));

        uninit_tabs.forEach(tab_group => {
            this.setStatesValue(tab_group, Object.keys(this.subscriptions[tab_group])[0]);
        });
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
            return listener.substring(1);
        }

        if (listener.includes(':')) {
            return listener.split(':', 2)[0];
        }

        return listener;
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
        // sanitize to avoid unintended typos in name or values
        state = state.replace(/[^a-z0-9_]/gi, '');
        value = value.replace(/[^a-z0-9_]/gi, '');

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