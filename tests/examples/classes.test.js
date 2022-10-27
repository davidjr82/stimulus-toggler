// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('classes');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('classes option example', async () => {

    // selectors
    let div_4 = document.querySelector('#div_4');
    let div_5 = document.querySelector('#div_5');
    let btn_toggle_4 = document.querySelector('#btn_toggle_4');
    let btn_toggle_5 = document.querySelector('#btn_toggle_5');
    let btn_toggle_4_5 = document.querySelector('#btn_toggle_4_5');

    // presence
    expect(div_4).toBeInTheDocument();
    expect(div_5).toBeInTheDocument();
    expect(btn_toggle_4).toBeInTheDocument();
    expect(btn_toggle_5).toBeInTheDocument();
    expect(btn_toggle_4_5).toBeInTheDocument();

    // first state
    expectClass(div_4, 'bg');
    expectNotClass(div_5, 'bg');

    // act and test!

    // 04
    await userEvent.click(btn_toggle_4);
    expectNotClass(div_4, 'bg');
    await userEvent.click(btn_toggle_4);
    expectClass(div_4, 'bg');

    // 05
    await userEvent.click(btn_toggle_5);
    expectClass(div_5, 'bg');
    await userEvent.click(btn_toggle_5);
    expectNotClass(div_5, 'bg');

    // 04-05
    await userEvent.click(btn_toggle_4_5);
    expectNotClass(div_4, 'bg');
    expectClass(div_5, 'bg');
    await userEvent.click(btn_toggle_4_5);
    expectClass(div_4, 'bg');
    expectNotClass(div_5, 'bg');
});