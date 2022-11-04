// subscriptions helpers
const setListenedSubscriptions = (subscription_variable, element, listened_states) => {
    listened_states.forEach(listened_state => {

        listened_state = listened_state.replace(/[^a-z0-9_\+\-\:]/gi, '');

        if (listened_state.startsWith('+')) {
            setSubscriptionOn(subscription_variable, element, listened_state.substring(1));
        }

        else if (listened_state.startsWith('-')) {
            setSubscriptionOff(subscription_variable, element, listened_state.substring(1));
        }

        else if (listened_state.includes(':')) {
            let separator_position = listened_state.indexOf(':');
            let state = listened_state.substring(0, separator_position);
            let value = listened_state.substring(separator_position + 1);
            setSubscriptionsValue(subscription_variable, element, state, value);
        }

        else {
            setSubscriptionOn(subscription_variable, element, listened_state);
            setSubscriptionOff(subscription_variable, element, listened_state);
        }
    });
}

const setSubscriptionOn = (subscription_variable, element, state) => {
    setSubscriptionsValue(subscription_variable, element, state, 'on');
}

const setSubscriptionOff = (subscription_variable, element, state) => {
    setSubscriptionsValue(subscription_variable, element, state, 'off');
}

const setSubscriptionsValue = (subscription_variable, element, state, value) => {

    // sanitize to avoid unintended typos in name or values
    state = state.replace(/[^a-z0-9_]/gi, '_');
    value = value.replace(/[^a-z0-9_]/gi, '_');

    if (state.length == 0 || value.length == 0) {
        return;
    }

    subscription_variable[state] = subscription_variable[state] || {};
    subscription_variable[state][value] = subscription_variable[state][value] || [];

    subscription_variable[state][value].push(element);
}

export { setListenedSubscriptions };