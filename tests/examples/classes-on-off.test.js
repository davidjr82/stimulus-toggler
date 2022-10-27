// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('classes-on-off');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('classes on/off option example', async () => {

    // selectors
    let div_6 = document.querySelector('#div_6');
    let div_7 = document.querySelector('#div_7');
    let btn_toggle_6 = document.querySelector('#btn_toggle_6');
    let btn_toggle_6_7 = document.querySelector('#btn_toggle_6_7');

    // presence
    expect(div_6).toBeInTheDocument();
    expect(div_7).toBeInTheDocument();
    expect(btn_toggle_6).toBeInTheDocument();
    expect(btn_toggle_6_7).toBeInTheDocument();

    // first state
    expectNotClass(div_6, 'bg-fuchsia-500');
    expectClass(div_6, 'bg-stone-500');
    expectClass(div_7, 'bg-amber-500');
    expectNotClass(div_7, 'bg-zinc-500');

    // act and test!

    // 06
    await userEvent.click(btn_toggle_6);
    expectClass(div_6, 'bg-fuchsia-500');
    expectNotClass(div_6, 'bg-stone-500');

    // 06-07
    await userEvent.click(btn_toggle_6_7);
    expectNotClass(div_6, 'bg-fuchsia-500');
    expectClass(div_6, 'bg-stone-500');
    expectNotClass(div_7, 'bg-amber-500');
    expectClass(div_7, 'bg-zinc-500');

    await userEvent.click(btn_toggle_6);
    expectClass(div_6, 'bg-fuchsia-500');
    expectNotClass(div_6, 'bg-stone-500');

    await userEvent.click(btn_toggle_6);
    expectNotClass(div_6, 'bg-fuchsia-500');
    expectClass(div_6, 'bg-stone-500');

    await userEvent.click(btn_toggle_6_7);
    expectClass(div_6, 'bg-fuchsia-500');
    expectNotClass(div_6, 'bg-stone-500');
    expectClass(div_7, 'bg-amber-500');
    expectNotClass(div_7, 'bg-zinc-500');
});