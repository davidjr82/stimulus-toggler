import { addClasses, removeClasses } from './utils_html_classes';

export async function enter(element, transitionName = null) {
    await runTransition('enter', element, transitionName)
}

export async function leave(element, transitionName = null) {
    await runTransition('leave', element, transitionName)
}

async function runTransition(direction, element, transitionName = null) {
    const dataName = transitionName ? `${transitionName}-${direction}` : direction;

    const activeClasses = getTransitionClasses(element, `${dataName}`);
    const startClasses = getTransitionClasses(element, `${dataName}-start`);
    const endClasses = getTransitionClasses(element, `${dataName}-end`);

    if (activeClasses.length || startClasses.length || endClasses.length) {
        addClasses(element, activeClasses);
        addClasses(element, startClasses);

        await nextFrame();

        removeClasses(element, startClasses);
        addClasses(element, endClasses);

        await afterTransition(element);

        removeClasses(element, endClasses);
        removeClasses(element, activeClasses);
    }
}

function getTransitionClasses(element, name) {
    return element.getAttribute(`data-transition-${name}`)?.split(" ") ?? [];
}

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve)
        });
    });
}

function afterTransition(element) {
    return new Promise(resolve => {
        // safari return string with comma separate values
        const computedDuration = getComputedStyle(element).transitionDuration.split(",")[0]
        const duration = Number(computedDuration.replace('s', '')) * 1000;
        setTimeout(() => {
            resolve()
        }, duration)
    });
}