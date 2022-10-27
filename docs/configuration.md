# Configuration

VitePress comes with built in Markdown Extensions.

## Commonly used options

| Option | Use  |
| ------ | ---- |
| data-controller="toggler" | Initialize the controller, recommended in body |
| data-action="toggler#states | Fires the event to change the variables set in data-toggler-states-param |
| data-toggler-states-param="+a,-b,c" | Define what variables to change and how.<br />Multiple vars can be changed at once separated by commas. + means on, - means off, var name means toggle. |

## Not so commonly used options

| Option | Use  |
| ------ | ---- |
| data-toggler-initial="+a,-b,c" | When an element is connected, the controller will try to guess its state based on their classes. Using this option will force the initial state of some vars instead of guessing. |