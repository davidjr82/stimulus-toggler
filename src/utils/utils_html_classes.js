import {enter, leave} from './utils_transition';

const replaceClasses = (elements, state, value, skip_transition = false) => {
    if(value == 'on') {

        // we want to run the remove hidden at the same time than the transitions
        elements.forEach(element => {
            addClasses(element, getClassesOn(element, state) );
            removeClasses(element, getClassesOff(element, state) );

            if(!skip_transition) {
                enter(element);
            }
        });
    }

    // we want to run the add hidden when all off transitions are finished
    if(value == 'off') {
        Promise.all(
            skip_transition ? [new Promise(resolve => resolve({success:true}))] : elements.map(leave)
        ).then(() => {
            elements.forEach(element => {
                removeClasses(element, getClassesOn(element, state) );
                addClasses(element, getClassesOff(element, state) );
            });
        });
    }
}

const addClasses = (element, classes) => {
    classes.forEach(token => {
        let trimmed_token = token.trim();

        if(trimmed_token != '') {
            element.classList.add(trimmed_token);
        }
    });
}

const removeClasses = (element, classes) => {
    classes.forEach(token => {
        let trimmed_token = token.trim();

        if(trimmed_token != '') {
            element.classList.remove(trimmed_token);
        }
    });
}

const getClassesOn = (element, state) => {

    if(element.hasAttribute('data-toggler-classes-on-' + state) || element.hasAttribute('data-toggler-classes-off-' + state)) {
        return element.getAttribute('data-toggler-classes-on-' + state)?.split(' ') || [];
    }

    if(element.hasAttribute('data-toggler-classes-on') || element.hasAttribute('data-toggler-classes-off')) {
        return element.getAttribute('data-toggler-classes-on')?.split(' ') || [];
    }

    if(element.hasAttribute('data-toggler-classes')) {
        return element.getAttribute('data-toggler-classes').split(' ') || [];
    }

    return [];
}

const getClassesOff = (element, state) => {

    if(element.hasAttribute('data-toggler-classes-off-' + state) || element.hasAttribute('data-toggler-classes-on-' + state)) {
        return element.getAttribute('data-toggler-classes-off-' + state)?.split(' ') || [];
    }

    if(element.hasAttribute('data-toggler-classes-off') || element.hasAttribute('data-toggler-classes-on')) {
        return element.getAttribute('data-toggler-classes-off')?.split(' ') || [];
    }

    if(element.hasAttribute('data-toggler-classes')) {
        return [];
    }

    return ['hidden'];
}

export { replaceClasses, getClassesOn, getClassesOff, addClasses, removeClasses };