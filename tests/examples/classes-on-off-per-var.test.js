// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('classes-on-off-per-var');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('classes on/off per var option example', async () => {

    // selectors
    let div_8 = document.querySelector('#div_8');
    let btn_toggle_8_color = document.querySelector('#btn_toggle_8_color');
    let btn_toggle_8_font = document.querySelector('#btn_toggle_8_font');
    let btn_toggle_8_color_font = document.querySelector('#btn_toggle_8_color_font');

    // presence
    expect(div_8).toBeInTheDocument();
    expect(btn_toggle_8_color).toBeInTheDocument();
    expect(btn_toggle_8_font).toBeInTheDocument();
    expect(btn_toggle_8_color_font).toBeInTheDocument();

    // first state
    expectClass(div_8, 'bg-stone-500');
    expectNotClass(div_8, 'bg-fuchsia-500');
    expectClass(div_8, 'text-xs');
    expectNotClass(div_8, 'text-xl');

    // act and test!

    // 08 color
    await userEvent.click(btn_toggle_8_color);
    expectNotClass(div_8, 'bg-stone-500');
    expectClass(div_8, 'bg-fuchsia-500');

    // 08 font
    await userEvent.click(btn_toggle_8_font);
    expectNotClass(div_8, 'text-xs');
    expectClass(div_8, 'text-xl');

    // 08 both
    await userEvent.click(btn_toggle_8_color_font);
    expectClass(div_8, 'bg-stone-500');
    expectNotClass(div_8, 'bg-fuchsia-500');
    expectClass(div_8, 'text-xs');
    expectNotClass(div_8, 'text-xl');

    // 08 font
    await userEvent.click(btn_toggle_8_font);
    expectNotClass(div_8, 'text-xs');
    expectClass(div_8, 'text-xl');

    // 08 both
    await userEvent.click(btn_toggle_8_color_font);
    expectNotClass(div_8, 'bg-stone-500');
    expectClass(div_8, 'bg-fuchsia-500');
    expectClass(div_8, 'text-xs');
    expectNotClass(div_8, 'text-xl');

    // 08 color
    await userEvent.click(btn_toggle_8_color);
    expectClass(div_8, 'bg-stone-500');
    expectNotClass(div_8, 'bg-fuchsia-500');

    // 08 both
    await userEvent.click(btn_toggle_8_color_font);
    expectNotClass(div_8, 'bg-stone-500');
    expectClass(div_8, 'bg-fuchsia-500');
    expectNotClass(div_8, 'text-xs');
    expectClass(div_8, 'text-xl');
});