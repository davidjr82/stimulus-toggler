const debugShowStates = (debug, element_id, obj) => {
    if(debug && document.getElementById(element_id)) {
        document.getElementById(element_id).innerHTML = element_id + ':' + JSON.stringify(obj);
    }
}

const debugAppendActions = (debug) => {
    if(debug) {
        document.querySelectorAll('[data-action="toggler#states"]').forEach(element => {
            if(!element.hasAttribute('data-toggler-no-debug')) {
                element.insertAdjacentHTML('beforeend', '<br />(actions: ' + (element.dataset?.togglerStatesParam || 'No params!') + ')')
            }
        });
    }
}

const debugAppendListens = (debug, element) => {
    let listen = element.dataset?.togglerListen?.split(',') || [];

    if(debug && !element.hasAttribute('data-toggler-no-debug')) {
        element.insertAdjacentHTML('beforeend', '<br />(listen: ' + listen.join(', ') + ')');
    }
}

export { debugShowStates, debugAppendActions, debugAppendListens };