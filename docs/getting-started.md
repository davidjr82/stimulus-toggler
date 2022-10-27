# Getting started

Follow these steps to have it working.

## Requirements

[Hotwired Stimulus](https://github.com/hotwired/stimulus) >=v3 must be installed.

Follow instructions in https://stimulus.hotwired.dev/handbook/installing

## Installation

Install the package:

```bash
npm install @davidjr82/stimulus-toggler
```

## Use it in your app

Import the controller into your application:

```js
import { Application } from "@hotwired/stimulus";

import TogglerController from "@davidjr82/toggler_controller";

window.Stimulus = Application.start();
Stimulus.register("toggler", TogglerController);
```

Then, initialize the controller in you html, for example, in the body tag:

```html
<body data-controller="toggler">
    ...
</body>
```

And now copy any of the examples inside your body tag. :tada: :100: