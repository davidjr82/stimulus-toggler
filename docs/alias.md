# Automatic aliasing

It is a [Hotwired Stimulus](https://stimulus.hotwired.dev/) controller used to toggle classes of the DOM elements.

## From `data-toggler-states`

If only `data-toggler-states` is set in an element, the controller will attach the action `data-action="toggler#states"` automatically so you don't have to take care of it.

The default action that is added to an element is the [default event shorthand](https://stimulus.hotwired.dev/reference/actions#event-shorthand) `data-action="toggler#states"`.

This means that if you want to trigger an action in other type of element you should write the action yourself.

**Example**

In a div there is no default action, so you will need to do add the `data-action` with `click` event to it:

```html
<div data-toggler-states="sidebar" data-action="click->toggler#states">
        ...
</div>
```