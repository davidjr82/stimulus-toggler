// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('multiple-basic');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('multiple basic example', async () => {

    // selectors
    let div_1 = document.querySelector('#div_1');
    let div_2 = document.querySelector('#div_2');
    let div_3 = document.querySelector('#div_3');
    let btn_mix_1_2_3 = document.querySelector('#btn_mix_1_2_3');
    let btn_hide_1_2_3 = document.querySelector('#btn_hide_1_2_3');
    let btn_show_1_2_3 = document.querySelector('#btn_show_1_2_3');
    let btn_toggle_1_2_3 = document.querySelector('#btn_toggle_1_2_3');

    // presence
    expect(div_1).toBeInTheDocument();
    expect(div_2).toBeInTheDocument();
    expect(div_3).toBeInTheDocument();
    expect(btn_mix_1_2_3).toBeInTheDocument();
    expect(btn_hide_1_2_3).toBeInTheDocument();
    expect(btn_show_1_2_3).toBeInTheDocument();
    expect(btn_toggle_1_2_3).toBeInTheDocument();

    // first state
    expectNotClass(div_1, 'hidden');
    expectNotClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // act and test!

    // toggle
    await userEvent.click(btn_toggle_1_2_3);
    expectClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectNotClass(div_3, 'hidden');

    await userEvent.click(btn_toggle_1_2_3);
    expectNotClass(div_1, 'hidden');
    expectNotClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // hide
    await userEvent.click(btn_hide_1_2_3);
    expectClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // show
    await userEvent.click(btn_show_1_2_3);
    expectNotClass(div_1, 'hidden');
    expectNotClass(div_2, 'hidden');
    expectNotClass(div_3, 'hidden');

    // hide
    await userEvent.click(btn_hide_1_2_3);
    expectClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // show
    await userEvent.click(btn_show_1_2_3);
    expectNotClass(div_1, 'hidden');
    expectNotClass(div_2, 'hidden');
    expectNotClass(div_3, 'hidden');

    // mix
    await userEvent.click(btn_mix_1_2_3);
    expectNotClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // hide
    await userEvent.click(btn_hide_1_2_3);
    expectClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectClass(div_3, 'hidden');

    // mix
    await userEvent.click(btn_mix_1_2_3);
    expectNotClass(div_1, 'hidden');
    expectClass(div_2, 'hidden');
    expectNotClass(div_3, 'hidden');
});