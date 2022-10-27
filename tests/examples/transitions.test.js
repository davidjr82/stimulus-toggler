// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('transitions');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('transitions example', async () => {

    // selectors
    let div_11 = document.querySelector('#div_11');
    let div_12 = document.querySelector('#div_12');
    let btn_toggle_11 = document.querySelector('#btn_toggle_11');
    let btn_toggle_11_12 = document.querySelector('#btn_toggle_11_12');

    // presence
    expect(div_11).toBeInTheDocument();
    expect(div_12).toBeInTheDocument();
    expect(btn_toggle_11).toBeInTheDocument();
    expect(btn_toggle_11_12).toBeInTheDocument();

    // first state
    expectClass(div_11, 'bg-fuchsia-500');
    expectNotClass(div_12, 'bg-fuchsia-500');

    // act and test!

    // 11
    await userEvent.click(btn_toggle_11);
    expectClass(div_11, 'bg-fuchsia-500 ease-in-out duration-500 bg-opacity-100');
    await new Promise(res => setTimeout(res, 600));
    expectNotClass(div_11, 'bg-fuchsia-500');

    // 12
    await userEvent.click(btn_toggle_11_12);
    expectClass(div_12, 'bg-fuchsia-500 ease-in-out duration-500 bg-opacity-0');
    await new Promise(res => setTimeout(res, 600));
    expectClass(div_12, 'bg-fuchsia-500');
});