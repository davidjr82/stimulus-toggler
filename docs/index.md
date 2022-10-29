# What is Stimulus Toggler?

It is a [Hotwired Stimulus](https://stimulus.hotwired.dev/) controller used to toggle classes of the DOM elements.

## How it works?

The controller set variables to on/off when an element triggers the action with<br />
`data-action="toggler#states"`.

The values that action want to set for the variables are defined by<br />
`data-toggler-states`.

If only `data-toggler-states` is set in an element, the controller will attach the action automatically so you don't have to take care of it. [See Automatic aliasing section](/alias.md).


## Setting variables

Using the token `+` before a variable, will set it to **on**.<br />
Using the token `-` before a variable, will set it to **off**.<br />
Without any token, it **toggles** the variable.

**Examples:**

```html
<!-- Clicking here, it will... -->
<button data-toggler-states="-sidebar">...set "sidebar" to off</button>
<button data-toggler-states="+sidebar">...set "sidebar" to on</button>
<button data-toggler-states="sidebar">...toggle "sidebar" on/off</button>
```

## Reacting to variable changes

Using the mutation observer provided by Stimulus, as soon as a variable changes, other elements react to it adding, removing or toggling their classes accordingly.

**Examples:**

```html
<!-- We listen to the variable sidebar, by default the class to toggle is `hidden` -->
<div
    data-toggler-target="toggleable"
    data-toggler-listen="sidebar">
        This is my fancy sidebar
</div>
```

## Other rules

::: warning
Variables names only allows alphanumeric characters and the character "_".

Starting a variable with "tab_" is reserved for tabs and should not be used in regular states.
:::