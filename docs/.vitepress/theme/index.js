import DefaultTheme from 'vitepress/theme'

import './tailwind.postcss'

import { Application } from "@hotwired/stimulus";
import Toggler from "./../../../src/controllers/toggler_controller.js";

if(typeof window !== 'undefined') {
    window.application = Application.start();
    window.application.register("toggler", Toggler);
}

export default { ...DefaultTheme }
