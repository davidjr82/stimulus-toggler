// stimulus
import { Application } from '@hotwired/stimulus';
import { default as Toggler } from "../../src/controllers/toggler_controller";

// utils
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { loadHtmlFromExample, expectClass, expectNotClass } from '../utils';

let tabLinkClassesOn = 'border-indigo-500 text-indigo-600';

beforeEach(() => {
    document.body.innerHTML = loadHtmlFromExample('tabs-example');
    const stimulus = Application.start();
    stimulus.register("toggler", Toggler);
});

test('tabs example', async () => {

    // selectors
    let tabs_account = document.querySelector('#tabs_account');
    let tabs_company = document.querySelector('#tabs_company');
    let tabs_team = document.querySelector('#tabs_team');
    let tabs_billing = document.querySelector('#tabs_billing');

    // content
    let tabs_content_account = document.querySelector('#tabs_content_account');
    let tabs_content_company = document.querySelector('#tabs_content_company');
    let tabs_content_team = document.querySelector('#tabs_content_team');
    let tabs_content_billing = document.querySelector('#tabs_content_billing');


    // presence
    expect(tabs_account).toBeInTheDocument();
    expect(tabs_company).toBeInTheDocument();
    expect(tabs_team).toBeInTheDocument();
    expect(tabs_billing).toBeInTheDocument();

    expect(tabs_content_account).toBeInTheDocument();
    expect(tabs_content_company).toBeInTheDocument();
    expect(tabs_content_team).toBeInTheDocument();
    expect(tabs_content_billing).toBeInTheDocument();


    // first state
    expectNotClass(tabs_account, tabLinkClassesOn);
    expectNotClass(tabs_company, tabLinkClassesOn);
    expectClass(tabs_team, tabLinkClassesOn);
    expectNotClass(tabs_billing, tabLinkClassesOn);

    expectClass(tabs_content_account, 'hidden');
    expectClass(tabs_content_company, 'hidden');
    expectNotClass(tabs_content_team, 'hidden');
    expectClass(tabs_content_billing, 'hidden');


    // act and test!

    await userEvent.click(tabs_account);
    expectClass(tabs_account, tabLinkClassesOn);
    expectNotClass(tabs_company, tabLinkClassesOn);
    expectNotClass(tabs_team, tabLinkClassesOn);
    expectNotClass(tabs_billing, tabLinkClassesOn);

    expectNotClass(tabs_content_account, 'hidden');
    expectClass(tabs_content_company, 'hidden');
    expectClass(tabs_content_team, 'hidden');
    expectClass(tabs_content_billing, 'hidden');

    // click third tab
    await userEvent.click(tabs_team);
    expectNotClass(tabs_account, tabLinkClassesOn);
    expectNotClass(tabs_company, tabLinkClassesOn);
    expectClass(tabs_team, tabLinkClassesOn);
    expectNotClass(tabs_billing, tabLinkClassesOn);

    expectClass(tabs_content_account, 'hidden');
    expectClass(tabs_content_company, 'hidden');
    expectNotClass(tabs_content_team, 'hidden');
    expectClass(tabs_content_billing, 'hidden');

    // click forth tab
    await userEvent.click(tabs_billing);
    expectNotClass(tabs_account, tabLinkClassesOn);
    expectNotClass(tabs_company, tabLinkClassesOn);
    expectNotClass(tabs_team, tabLinkClassesOn);
    expectClass(tabs_billing, tabLinkClassesOn);

    expectClass(tabs_content_account, 'hidden');
    expectClass(tabs_content_company, 'hidden');
    expectClass(tabs_content_team, 'hidden');
    expectNotClass(tabs_content_billing, 'hidden');

    // click second tab
    await userEvent.click(tabs_company);
    expectNotClass(tabs_account, tabLinkClassesOn);
    expectClass(tabs_company, tabLinkClassesOn);
    expectNotClass(tabs_team, tabLinkClassesOn);
    expectNotClass(tabs_billing, tabLinkClassesOn);

    expectClass(tabs_content_account, 'hidden');
    expectNotClass(tabs_content_company, 'hidden');
    expectClass(tabs_content_team, 'hidden');
    expectClass(tabs_content_billing, 'hidden');
});