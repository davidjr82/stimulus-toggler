// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('click-outside') + '<div id="util_outside"></div>';
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('click outside example', async () => {

    // selectors
    let util_outside = document.querySelector('#util_outside'); // outside element
    let div_9 = document.querySelector('#div_9');
    let div_10 = document.querySelector('#div_10');
    let btn_toggle_9 = document.querySelector('#btn_toggle_9');
    let btn_toggle_10 = document.querySelector('#btn_toggle_10');

    // presence
    expect(util_outside).toBeInTheDocument();
    expect(div_9).toBeInTheDocument();
    expect(div_10).toBeInTheDocument();
    expect(btn_toggle_9).toBeInTheDocument();
    expect(btn_toggle_10).toBeInTheDocument();

    // first state
    expectClass(div_9, 'hidden');
    expectClass(div_10, 'hidden');

    // act and test!

    // 09
    await userEvent.click(btn_toggle_9);
    expectNotClass(div_9, 'hidden');
    await userEvent.click(util_outside);
    expectClass(div_9, 'hidden');

    // 09 not ignore
    await userEvent.click(btn_toggle_9);
    expectNotClass(div_9, 'hidden');
    await userEvent.click(div_9);
    expectClass(div_9, 'hidden');

    // 10
    await userEvent.click(btn_toggle_10);
    expectNotClass(div_10, 'hidden');
    await userEvent.click(util_outside);
    expectClass(div_10, 'hidden');

    // 10 ignore
    await userEvent.click(btn_toggle_10);
    expectNotClass(div_10, 'hidden');
    await userEvent.click(div_10);
    expectNotClass(div_10, 'hidden');
});