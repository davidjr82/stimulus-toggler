const appendAttribute = (element, attribute, append) => {

    if(!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, append);
        return;
    }
    let attr = element.getAttribute(attribute);

    element.setAttribute(attribute, attr + ' ' + append);
}

const aliasTabs = (element) => {

    let tab_link = element.getAttribute('data-toggler-tab-link')?.split(':') || [];

    if(tab_link.length == 2) {
        appendAttribute(element, 'data-action', "toggler#states");
        appendAttribute(element, 'data-toggler-states', prefixedTab(tab_link));
        appendAttribute(element, 'data-toggler-listen', prefixedTab(tab_link));
        element.removeAttribute('data-toggler-tab-link');
    }

    let tab_content = element.getAttribute('data-toggler-tab-content')?.split(':') || [];
    if(tab_content.length == 2) {
        appendAttribute(element, 'data-toggler-listen', prefixedTab(tab_content));
        element.removeAttribute('data-toggler-tab-content');
    }
}

const prefixedTab = ([tab_group,tab_name]) => { return tab_name.startsWith('tab_') ? ([tab_group,tab_name]).join(':') + '' : ('tab_' + ([tab_group,tab_name]).join(':'));}

const autoInitAction = (element) => {

    if(!element.hasAttribute('data-toggler-states')) {
        return;
    }

    if(! element.hasAttribute('data-action')) {
        appendAttribute(element, 'data-action', "toggler#states");
        return;
    }

    if(element.hasAttribute('data-action')) {

        if(element.getAttribute('data-action').includes('toggler#states')) {
            return;
        }

        appendAttribute(element, 'data-action', "toggler#states");
        return;
    }
}

export { aliasTabs, autoInitAction };