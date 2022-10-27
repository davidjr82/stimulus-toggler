// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('basic');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('basic example', async () => {

    // selectors
    let sidebar = document.querySelector('#sidebar');
    let btn_hide_sidebar = document.querySelector('#btn_hide_sidebar');
    let btn_show_sidebar = document.querySelector('#btn_show_sidebar');
    let btn_toggle_sidebar = document.querySelector('#btn_toggle_sidebar');

    // presence
    expect(sidebar).toBeInTheDocument();
    expect(btn_hide_sidebar).toBeInTheDocument();
    expect(btn_show_sidebar).toBeInTheDocument();
    expect(btn_toggle_sidebar).toBeInTheDocument();

    // first state
    expectNotClass(sidebar, 'hidden');

    // act and test!
    await userEvent.click(btn_toggle_sidebar);
    expectClass(sidebar, 'hidden');

    await userEvent.click(btn_show_sidebar);
    expectNotClass(sidebar, 'hidden');

    await userEvent.click(btn_hide_sidebar);
    expectClass(sidebar, 'hidden');
});